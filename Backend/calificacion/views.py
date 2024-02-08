from rest_framework import viewsets
from rest_framework.views import APIView
from calificacion.serializers.calificacion import CalificacionSerializer
from calificacion.models.calificacion import Calificacion

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

from estudiante.models.estudiante import Estudiante

class CalificacionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer

from rest_framework.response import Response
from curso.models.curso import Curso
from rest_framework import status
class ListaCalificacionesViewSet(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]

    def get(self, request, id):
        parametros = request.GET
        curso_id = parametros.get('codigo_curso')
        if not curso_id:
            return Response({'error': 'Se requiere el parametro \'codigo_curso\' válido'}, status=status.HTTP_400_BAD_REQUEST)
        try: 
            curso = Curso.objects.get(id=curso_id)
            estudiante = Estudiante.objects.get(id=id)
            calificaciones = Calificacion.objects.filter(EstCod=estudiante, CurCod=curso)
            data = [
                {
                    'codigo_docente': calificacion.DocCod.id,
                    'nota_participacion': calificacion.CalPar,
                    'nota_tarea': calificacion.CalTar,
                    'nota_examen': calificacion.CalExa,
                    'fecha': calificacion.CalFec
                } for calificacion in calificaciones
            ]
            return Response(data, status=status.HTTP_200_OK)
        except Estudiante.DoesNotExist as e:
            return Response({'error': f'Estudiante con id \'{str(id)}\'no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Curso.DoesNotExist as e:
            return Response({'error': f'Curso con id \'{str(curso_id)}\'no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    