# from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', include('main.urls')),
    path('api/auth/', include('account.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    re_path('(^(?!(media)).*$)', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
