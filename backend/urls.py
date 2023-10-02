# from django.contrib import admin
from django.urls import path, include
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
#     TokenVerifyView
# )


from main.views import TaskAPIUpdateDelete, TaskAPIView
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index),
    path('api/todos/', TaskAPIView.as_view()),
    path('api/todos/<int:pk>/', TaskAPIUpdateDelete.as_view()),
    path('api/auth/', include('account.urls')),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/auth/signup/', RegisterApi.as_view(), name='token_register'),
    # path('api/auth/logout/', LogoutAPIView.as_view(), name='token_logout'),
]
