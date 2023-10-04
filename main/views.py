from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task


class TaskAPIView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user_id=user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskAPIUpdateDelete(generics.UpdateAPIView, generics.DestroyAPIView):
    # queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user_id=user)