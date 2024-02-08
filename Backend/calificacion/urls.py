
from django.urls import path, include
from rest_framework import routers
from calificacion import views

router = routers.DefaultRouter()
router.register('', views.CalificacionViewSet, 'calificacion')

urlpatterns = [
    path("listaCalificaciones/<int:id>/", views.ListaCalificacionesViewSet.as_view(), name='calificaciones'),
    path("", include(router.urls)),
]