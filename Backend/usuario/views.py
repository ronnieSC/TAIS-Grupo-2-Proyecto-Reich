from main.settings import INTERFACE_ROLES

from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from usuario.models.usuario import Usuario
from usuario.models.rol import Rol

from administrador.models.administrador import Administrador
from estudiante.models.estudiante import Estudiante
from docente.models.docente import Docente
from apoderado.models.apoderado import Apoderado

from usuario.serializers.usuario import UsuarioSerializer 
from usuario.serializers.rol import RolSerializer
from administrador.serializers.administrador import AdministradorSerializer
from estudiante.serializers.estudiante import EstudianteSerializer
from docente.serializers.docente import DocenteSerializer
from apoderado.serializers.apoderado import ApoderadoSerializer
from usuario.serializers.password import PasswordSerializer

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

from django.core.exceptions import ObjectDoesNotExist 

# API solo de lectura para la informacion del usuario logueado
class PerfilView(views.APIView):
    authentication_classes = [JWTAuthentication]
        
    def get(self, request, format=None):
        try: 
            usuario = Usuario.objects.get(UseCod=request.user.pk)
            rol = usuario.RolCod.RolNom
            if rol == INTERFACE_ROLES.ADMINISTRADOR:
                administrador = Administrador.objects.get(UsuCod=usuario.pk)
                administrador_data = AdministradorSerializer(administrador)
                return Response(administrador_data.data, status=status.HTTP_200_OK)

            elif rol == INTERFACE_ROLES.ESTUDIANTE:
                estudiante = Estudiante.objects.get(UsuCod=usuario.pk)
                estudiante_data = EstudianteSerializer(estudiante)
                return Response(estudiante_data.data, status=status.HTTP_200_OK)
 
            elif rol == INTERFACE_ROLES.DOCENTE:
                docente = Docente.objects.get(UsuCod=usuario.pk)
                docente_data = DocenteSerializer(docente)
                return Response(docente_data.data, status=status.HTTP_200_OK)

            elif rol == INTERFACE_ROLES.APODERADO:
                apoderado = Apoderado.objects.get(UsuCod=usuario.pk)
                apoderado_data = ApoderadoSerializer(apoderado)
                return Response(apoderado_data.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(data={"error": "Error desconocido"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#API para usuarios 
class UsuarioView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer 

#API para rol permisos en general
class RolView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

# API para cambio de contraseña

class CambioPasswordView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, format=None):
        serializer = PasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if not request.user.check_password(serializer.data['antigua_password']):
            return Response(data={"error": "Contrasena incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.data['nueva_password1'] != serializer.data['nueva_password2']:
            return Response(data={"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST)
        if len(serializer.data['nueva_password1']) < 8:
            return Response(data={"error": "La contrasena debe ser mayor a 8 caracteres"}, status=status.HTTP_400_BAD_REQUEST)

        request.user.set_password(serializer.data['nueva_password1'])
        request.user.save()
        
        return Response({"message": "Contrasena cambiada"}, status=status.HTTP_200_OK)