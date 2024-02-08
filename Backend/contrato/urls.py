from django.urls import path, include
from rest_framework import routers
from contrato import views

router = routers.DefaultRouter()
router.register('acuerdoGuia', views.AcuerdoGuiaView, 'acuerdoGuia')
router.register('acuerdoMatricula', views.AcuerdoMatriculaView, 'acuerdoMatricula')
router.register('acuerdoPension', views.AcuerdoPensionView, 'acuerdoPension')
router.register('documentos', views.DocumentoView, 'documento')

router.register('', views.ContratoView)

urlpatterns = [
    path("reporte/<int:id>/", views.ReporteContratoView.as_view(), name='reporte'),
    path("", include(router.urls)),
]
