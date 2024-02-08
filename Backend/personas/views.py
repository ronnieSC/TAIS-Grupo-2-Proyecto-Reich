from rest_framework import viewsets
from .serializer import TipoDocumentoSerializer
from personas.models.tipo_documento import TipoDocumento

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class TipoDocumentoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = TipoDocumentoSerializer
    queryset = TipoDocumento.objects.all()
