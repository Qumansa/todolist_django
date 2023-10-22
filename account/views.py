from typing import Any, Dict
from django.shortcuts import render

from account import serializers, models
from django.contrib.auth import authenticate
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions, status, viewsets
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from django.conf import settings
from django.middleware import csrf
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import get_user_model
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return{
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    user = authenticate(username=username, password=password)
    
    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()
        res.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value = tokens["refresh_token"],
            expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        # res.data = tokens
        res.data = {"access_token": tokens["access_token"]}
        res["X-CSRFToken"] = csrf.get_token(request)
        return res


    raise rest_exceptions.AuthenticationFailed("Username or Password is incorrect")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response("Registered")
    return rest_exceptions.AuthenticationFailed("Invalid credentials")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'], samesite='none')
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], samesite='none')
        res.delete_cookie("X-CSRFToken", samesite='none')
        res.delete_cookie("csrftoken", samesite='none')
        return res
    except:
        raise rest_exceptions.ParseError("Invalid token")

class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            return jwt_exceptions.InvalidToken('No valid token found in cookie \'refresh\'')

class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value = response.data['refresh'],
                expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)

@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(requset):
    try:
        user = models.Account.objects.get(id=requset.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status_code=404)
    serializer = serializers.AccountSerializer(user)
    return response.Response(serializer.data)

class UpdatePasswordView(APIView):
    def put(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if new_password is None:
            return Response({"new_password": ["New password is null."]}, status=status.HTTP_400_BAD_REQUEST)
        if not user.check_password(old_password):
            return Response({"old_password": ["Incorrect password"], }, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)

class UserUpdateView(UpdateAPIView):
    queryset = get_user_model
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user