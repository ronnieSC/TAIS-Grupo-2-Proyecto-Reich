from rest_framework import viewsets

from administrador.serializers.administrador import AdministradorSerializer
from administrador.models.administrador import Administrador

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Para el acceso
from usuario.permisos import EsAdministrador

# Vista de API para administrador
class AdministradorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador]
    authentication_classes = [JWTAuthentication]
    serializer_class = AdministradorSerializer 
    queryset = Administrador.objects.all()
