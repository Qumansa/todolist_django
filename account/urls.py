from django.urls import path
from account import views

urlpatterns = [
    path('login', views.loginView),
    path('register', views.registerView),
    path('refresh-token', views.resreshTokenView),
    path('logout', views.logoutView),
]