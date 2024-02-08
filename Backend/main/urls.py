"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls
from .views import APIHome

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/administrador/', include('administrador.urls')),
    path('api/apoderados/', include('apoderado.urls')),
    path('api/calificaciones/', include('calificacion.urls')),
    path('api/clases/', include('clase.urls')),
    path('api/contratos/', include('contrato.urls')),
    path('api/cursos/', include('curso.urls')),
    path('api/docentes/', include('docente.urls')),
    path('api/estudiantes/', include('estudiante.urls')),
    path('api/fechaAcademica/', include('fechaAcademica.urls')),
    path('api/personas/', include('personas.urls')),
    path('api/precios/', include('precios.urls')),
    path('api/responsables/', include('responsable.urls')),
    path('api/usuarios/', include('usuario.urls')),
    path('api-docs/', include_docs_urls(title="Documentacion de la API")),
    path('api/', APIHome, name='API Home'),
    path('', APIHome, name='API Home'),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)