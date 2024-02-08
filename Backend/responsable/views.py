from rest_framework import viewsets
from .serializers.responsable import ResponsableSerializer
from .models.responsable import Responsable

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class ResponsableViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Responsable.objects.all()
    serializer_class = ResponsableSerializer
