from django.urls import path, include

from rest_framework import routers

from apoderado import views

router = routers.DefaultRouter()
router.register('parentescos', views.ParentescoView)
router.register('comentarios', views.ComentarioView)

urlpatterns = [
    path('generar-password/<int:id>/', views.GenerarPasswordParienteView.as_view(), name='generar-password'),
    path("", include(router.urls)),
]

