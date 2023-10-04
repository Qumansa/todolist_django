from django.db import models
from django.conf import settings

class Task(models.Model):
    description = models.CharField(max_length=255)
    favourite = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.description