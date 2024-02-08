from rest_framework import viewsets
from precios.models.precio import Precio
from precios.models.razon import Razon

from precios.serializers.precio import PrecioSerializer
from precios.serializers.razon import RazonSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class PrecioView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = PrecioSerializer
    queryset = Precio.objects.all()

class RazonView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = RazonSerializer
    queryset = Razon.objects.all()