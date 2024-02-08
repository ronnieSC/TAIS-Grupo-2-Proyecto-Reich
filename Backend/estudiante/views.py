from rest_framework import viewsets

from estudiante.serializers.observacion import ObservacionSerializer
from estudiante.serializers.estudiante import EstudianteSerializer

from estudiante.models.estudiante import Estudiante
from estudiante.models.observacion import Observacion

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

from usuario.gestor_usuarios import GestorUsuarios

class EstudianteView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()

class ObservacionView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = ObservacionSerializer
    queryset = Observacion.objects.all()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
class GenerarPasswordEstudianteView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador]
    authentication_classes = [JWTAuthentication]

    def post(self, request, id):
        try: 
            estudiante = Estudiante.objects.filter(id=id)
            if not estudiante.exists():
                return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            usuario = estudiante.first().UsuCod.UseCod
            password = GestorUsuarios.crear_contrasena(8)
            usuario.set_password(password)
            usuario.save()
            return Response({'message': 'Contraseña generada correctamente', 'password': password,}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)