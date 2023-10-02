from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
# from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import TaskSerializer, LogoutSerializer, RegisterSerializer, UserSerializer
from .models import Task


class TaskAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )

class TaskAPIUpdateDelete(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )

# class RegisterApi(generics.GenericAPIView):
#     serializer_class = RegisterSerializer
#     def post(self, request, *args,  **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "message": "User Created Successfully.",
#         })

# class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)