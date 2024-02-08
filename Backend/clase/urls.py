
from django.urls import path, include
from rest_framework import routers
from clase import views 

router = routers.DefaultRouter()
router.register(r'grado', views.GradoView, 'grado')
router.register(r'nivel', views.NivelView, 'nivel')
router.register(r'estudianteclase', views.EstudianteClaseView, 'estudiante_clase')
router.register(r'', views.ClaseView, 'clase')

urlpatterns = [
    path("", include(router.urls)),
]


