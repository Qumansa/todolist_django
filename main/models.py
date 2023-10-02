from django.db import models
# from django.contrib.auth.models import User

class Task(models.Model):
    description = models.CharField(max_length=255)
    favourite = models.BooleanField(default=False)
    # user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)

    def __str__(self):
        return self.description