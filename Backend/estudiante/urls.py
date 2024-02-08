from django.urls import path, include
from rest_framework import routers
from estudiante import views

router = routers.DefaultRouter()
router.register('observaciones', views.ObservacionView)
router.register("", views.EstudianteView)

urlpatterns = [
    path('generar-password/<int:id>/', views.GenerarPasswordEstudianteView.as_view()),
    path("", include(router.urls)),
]

