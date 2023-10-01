from django.shortcuts import render

from account import serializers, models
from django.contrib.auth import authenticate
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from django.conf import settings
from django.middleware import csrf

def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return{
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_tokem)
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
            key = settings.SIMPLE_JWT['AUTH_COOKIE'],
            value = tokens["access_token"],
            expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        res.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value = tokens["refresh_token"],
            expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.data = tokens
        res["X-CSRFToken"] = csrf.get_token(request)
        return res


    raise rest_exceptions.AuthenticationFailed("Username or Password is incorrect")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializers = serializers.RegistrationSerializer(data=request.data)
    serializers.is_valid(raise_exception=True)

    user = serializers.save()

    if user is not None:
        return response.Response("Regisered")
    return rest_exceptions.AuthenticationFailed("Invalid credentials")

def registerView(request):
    pass

def resreshTokenView(request):
    pass

def logoutView(request):
    pass