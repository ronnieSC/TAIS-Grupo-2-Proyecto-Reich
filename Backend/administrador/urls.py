from django.urls import path, include
from rest_framework import routers
from administrador import views

router = routers.DefaultRouter()
router.register('', views.AdministradorViewSet, 'Administrador')

urlpatterns = [
    path("", include(router.urls)),
]

