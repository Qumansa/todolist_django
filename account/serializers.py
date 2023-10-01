from rest_framework import serializers
from django.conf import settings
from .models import Account

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ("username", "password", "img")
        extra_kwargs = {
            "password": {"write_only": True},
        }
    def save(self):
        user = settings.AUTH_USER_MODEL(
            username = self.validated_data["username"]
        )
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)