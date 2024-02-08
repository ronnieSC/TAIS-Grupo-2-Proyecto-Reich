
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from clase.models.nivel import Nivel 
from clase.models.grado import Grado
from clase.models.clase import Clase
from clase.models.estudiante_clase import EstudianteClase

from clase.serializers.nivel import NivelSerializer
from clase.serializers.grado import GradoSerializer 
from clase.serializers.clase import ClaseSerializer
from clase.serializers.estudiante_clase import EstudianteClaseSerializer

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class NivelView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = NivelSerializer
    queryset = Nivel.objects.all()

class GradoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = GradoSerializer
    queryset = Grado.objects.all()

class ClaseView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = ClaseSerializer 
    queryset = Clase.objects.all()

class EstudianteClaseView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = EstudianteClaseSerializer 
    queryset = EstudianteClase.objects.all()


