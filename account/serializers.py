from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("username", "password", "img")
        extra_kwargs = {
            "password": {"write_only": True},
        }
    def save(self):
        user = get_user_model()(
            username = self.validated_data["username"]
        )
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'img')