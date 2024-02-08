
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'bloques', views.BloqueView, 'bloque')
router.register(r'opinion', views.OpinionView, 'opinion')
router.register(r'actividad', views.ActividadView, 'actividad')
router.register(r'horario', views.HorarioView, 'horario')
router.register(r'telefonos', views.TelefonoView, 'telefono')
router.register(r'', views.DocenteView, 'docente')

urlpatterns = [
    path("horario/intercambiar/", views.IntercambiarBloquesView.as_view()),
    path("cursosAsignados/", views.CursosAsignadosView.as_view()),
    path("listadoAlumnos/<int:id>/", views.ListadoAlumnosView.as_view()),
    path('generar-password/<int:id>/', views.GenerarPasswordDocenteView.as_view()),
    path("", include(router.urls)),
]
