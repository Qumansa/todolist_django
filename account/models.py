from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class AccountManager(BaseUserManager):
    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError("Ligin is required")
        if not password:
            raise ValueError("Password is required")
        user = self.model(
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, username, password, **kwargs):
        user = self.create_user(
            username = username,
            paasword = password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return

class Account(AbstractBaseUser):
    username = models.CharField(max_length=20, blank=False, null=False, unique=True)
    img = models.CharField(max_length=50, default='user.png')
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = ["username"]

    def __str__(self):
        return self.username