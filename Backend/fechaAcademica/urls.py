from django.urls import path, include
from rest_framework import routers
from fechaAcademica import views

router = routers.DefaultRouter()
router.register('dias', views.DiaView, 'dia')
router.register('semanas', views.SemanaView, 'semana')
router.register('bimestres', views.BimestreView, 'bimestre')
router.register('anosAcademicos', views.AnoAcademicoView, 'anoAcademico')
router.register('', views.FechaAcademicaView, 'fechaAcademica')

urlpatterns = [
    path("", include(router.urls)),
]