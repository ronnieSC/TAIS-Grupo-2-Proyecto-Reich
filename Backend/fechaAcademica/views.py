from rest_framework import viewsets
from .serializer import SemanaSerializer, BimestreSerializer, AnoAcademicoSerializer, FechaAcademicaSerializer, DiaSerializer
from fechaAcademica.models.dia import Dia 
from fechaAcademica.models.semana import Semana
from fechaAcademica.models.bimestre import Bimestre
from fechaAcademica.models.ano_academico import AnoAcademico
from fechaAcademica.models.fecha_academica import FechaAcademica

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class SemanaView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = SemanaSerializer
    queryset = Semana.objects.all()

class BimestreView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = BimestreSerializer
    queryset = Bimestre.objects.all()

class AnoAcademicoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = AnoAcademicoSerializer
    queryset = AnoAcademico.objects.all()

class FechaAcademicaView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = FechaAcademicaSerializer
    queryset = FechaAcademica.objects.all()

class DiaView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class =DiaSerializer 
    queryset = Dia.objects.all()