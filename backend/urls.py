# from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/todos/', include('main.urls')),
    path('api/auth/', include('account.urls')),
]
