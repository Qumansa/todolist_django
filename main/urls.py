from django.urls import path, include

from main.views import TaskAPIUpdateDelete, TaskAPIView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', TaskAPIView.as_view()),
    path('<int:pk>/', TaskAPIUpdateDelete.as_view()),
]