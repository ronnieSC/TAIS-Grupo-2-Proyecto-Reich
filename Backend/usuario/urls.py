
from django.urls import path, include

from rest_framework import routers
from usuario.views import PerfilView
from usuario.views import RolView
from usuario.views import UsuarioView
from usuario.views import CambioPasswordView

# Para la autenticacion
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()

router.register('rol', RolView)
router.register('', UsuarioView)

urlpatterns = [
    path('ingresar/', TokenObtainPairView.as_view()),
    path('refrescar/', TokenRefreshView.as_view()),
    path('perfil/', PerfilView.as_view()),
    path('password/', CambioPasswordView.as_view()),
    path("", include(router.urls)),
]
