from rest_framework import viewsets

from .serializers.parentesco import ParentescoSerializer
from .serializers.comentario import ComentarioSerializer

from .models.parentesco import Parentesco
from .models.comentario import Comentario

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class ComentarioView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = ComentarioSerializer
    queryset = Comentario.objects.all()

class ParentescoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = ParentescoSerializer
    queryset = Parentesco.objects.all()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from usuario.gestor_usuarios import GestorUsuarios

class GenerarPasswordParienteView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador]
    authentication_classes = [JWTAuthentication]
    
    def post(self, request, id):
        """
        Generar password de apoderado (el id es de la instancia de parentesco)
        """
        try: 
            pariente = Parentesco.objects.filter(id=id)
            if not pariente.exists():
                return Response({'error': 'Pariente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            usuario = pariente.first().ParApoId.UsuCod.UseCod
            password = GestorUsuarios.crear_contrasena(8)
            usuario.set_password(password)
            usuario.save()
            return Response({'message': 'Contraseña generada correctamente', 'password': password,}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)