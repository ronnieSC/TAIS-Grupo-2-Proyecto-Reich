from django.urls import path, include
from rest_framework import routers
from personas import views

router = routers.DefaultRouter()
router.register('tipodocumentos', views.TipoDocumentoView, 'tipodocumentos')

urlpatterns = [
    path("", include(router.urls)),
]
