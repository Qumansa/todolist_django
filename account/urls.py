from django.urls import path
from account import views

urlpatterns = [
    path('login/', views.loginView),
    path('register/', views.registerView),
    path('refresh-token/', views.CookieTokenRefreshView.as_view()),
    path('logout/', views.logoutView),
    path('user/', views.user),
    path('user-update/', views.UserUpdateView.as_view()),
    path('update-password/', views.UpdatePasswordView.as_view()),
]