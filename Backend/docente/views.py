
from rest_framework import viewsets
from docente.models.docente import Docente
from docente.models.bloque import Bloque
from docente.models.opinion import Opinion
from docente.models.actividad import Actividad
from docente.models.horario import Horario
from docente.models.telefonos import Telefono 
from docente.serializers.docente import DocenteSerializer
from docente.serializers.bloque import BloqueSerializer 
from docente.serializers.opinion import OpinionSerializer 
from docente.serializers.actividad import ActividadSerializer
from docente.serializers.horario import HorarioSerializer
from docente.serializers.telefonos import TelefonoSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class DocenteView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer

class BloqueView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Bloque.objects.all()
    serializer_class = BloqueSerializer 
    
class ActividadView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer 

class OpinionView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Opinion.objects.all()
    serializer_class = OpinionSerializer

class HorarioView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer

class TelefonoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    queryset = Telefono.objects.all()
    serializer_class = TelefonoSerializer 

# API custom para intercambio de bloques
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

class IntercambiarBloquesView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        try: 
            codigo_bloque_1 = request.data.get('codigo_bloque_1')
            codigo_bloque_2 = request.data.get('codigo_bloque_2')
            with transaction.atomic():
                bloque_1 = Bloque.objects.get(pk=codigo_bloque_1)
                bloque_2 = Bloque.objects.get(pk=codigo_bloque_2)

                # Intercambiamos docentes, cursos y actividades
                bloque_1.DocCod , bloque_2.DocCod = bloque_2.DocCod, bloque_1.DocCod
                bloque_1.CurCod , bloque_2.CurCod = bloque_2.CurCod, bloque_1.CurCod
                bloque_1.ActCod , bloque_2.ActCod = bloque_2.ActCod, bloque_1.ActCod
                bloque_1.save()
                bloque_2.save()
                return Response(data={"message": "Bloques intercambiados correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth.models import User

class CursosAsignadosView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        try:
            django_user = User.objects.get(id=request.user.id)
            docente = Docente.getByDjangoUserId(django_user.id)
            bloques = Bloque.objects.filter(DocCod=docente)
            if not bloques.exists():
                return Response(data={"error": "El docente no tiene bloques programados"}, status=status.HTTP_200_OK)
            return Response([
                    {
                        "codigo_bloque": bloque.id,
                        "curso": bloque.CurCod.CurNom,
                        "nivel": bloque.HorCod.NivCod.NivNom,
                        "grado": bloque.HorCod.GraCod.GraNum,
                        "dia": bloque.DiaCod.DiaNom,
                        "hora_inicio": bloque.BloHorIni,
                        "hora_fin": bloque.BloHorFin
                    } for bloque in bloques
                ], status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from estudiante.models.estudiante import Estudiante
class ListadoAlumnosView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente]
    authentication_classes = [JWTAuthentication]
    """
    Listado de todos los alumnos de un docente en base al id del bloque
    """
    def get(self, request, id, *args, **kwargs):
        try:
            django_user = User.objects.get(id=request.user.id)
            docente = Docente.getByDjangoUserId(django_user.id)
            bloque = Bloque.objects.get(id=id)
            nivel = bloque.HorCod.NivCod
            grado = bloque.HorCod.GraCod
            estudiantes = Estudiante.objects.filter(
                NivCod=nivel,
                GraCod=grado
            )
            return Response(
            {
                "codigo_bloque": bloque.id,
                "codigo_curso": bloque.CurCod.id,
                "codigo_docente": docente.id,
                "curso": bloque.CurCod.CurNom,
                "nivel": nivel.NivNom,
                "grado": grado.GraNum,
                "estudiantes": [
                    {
                        "codigo_estudiante": estudiante.id,
                        "dni": estudiante.PerNumDoc,
                        "primer_nombre": estudiante.PerNom1,
                        "segundo_nombre": estudiante.PerNom2,
                        "apellido_paterno": estudiante.PerApePat,
                        "apellido_materno": estudiante.PerApeMat,
                    } for estudiante in estudiantes
            ]}, status=status.HTTP_200_OK)

        except Bloque.DoesNotExist as e:
            return Response(data={"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from usuario.gestor_usuarios import GestorUsuarios
class GenerarPasswordDocenteView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador]
    authentication_classes = [JWTAuthentication]

    def post(self, request, id):
        try: 
            docente = Docente.objects.filter(id=id)
            if not docente.exists():
                return Response({'error': 'Docente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            usuario = docente.first().UsuCod.UseCod
            password = GestorUsuarios.crear_contrasena(8)
            usuario.set_password(password)
            usuario.save()
            return Response({'message': 'Contraseña generada correctamente', 'password': password,}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)