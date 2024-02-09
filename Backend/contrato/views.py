from rest_framework import viewsets
from rest_framework.views import APIView

from contrato.serializers.contrato import ContratoSerializer
from contrato.serializers.acuerdo_guia import AcuerdoGuiaSerializer
from contrato.serializers.acuerdo_matricula import AcuerdoMatriculaSerializer
from contrato.serializers.acuerdo_pension import AcuerdoPensionSerializer
from contrato.serializers.documento import DocumentoSerializer
from contrato.serializers.entrega_documento import EntregaDocumentoSerializer

from contrato.models.acuerdo_guia import AcuerdoGuia
from contrato.models.documento import Documento
from contrato.models.contrato import Contrato
from contrato.models.acuerdo_matricula import AcuerdoMatricula
from contrato.models.acuerdo_pension import AcuerdoPension
from contrato.models.entrega_documento import EntregaDocumento

from contrato.reporte.contrato import generar_reporte_contrato

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

from usuario.permisos import EsAdministrador
from usuario.permisos import EsDocente
from usuario.permisos import EsEstudiante
from usuario.permisos import EsApoderado

class AcuerdoGuiaView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = AcuerdoGuiaSerializer
    queryset = AcuerdoGuia.objects.all()

class AcuerdoMatriculaView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = AcuerdoMatriculaSerializer
    queryset = AcuerdoMatricula.objects.all()

class AcuerdoPensionView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = AcuerdoPensionSerializer
    queryset = AcuerdoPension.objects.all()

class ContratoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = ContratoSerializer
    queryset = Contrato.objects.all()

class DocumentoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = DocumentoSerializer
    queryset = Documento.objects.all()

class EntregaDocumentoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    serializer_class = EntregaDocumentoSerializer
    queryset = EntregaDocumento.objects.all()

from rest_framework import status
from django.http import HttpResponse
# REPORTES
class ReporteContratoView(APIView):
    permission_classes = [IsAuthenticated, EsAdministrador|EsDocente|EsEstudiante|EsApoderado]
    authentication_classes = [JWTAuthentication]
    def get(self, request, id):
        try :
            contrato = Contrato.objects.get(id=id)
            apellidos = f'{contrato.ConEstId.PerApePat} {contrato.ConEstId.PerApeMat}'
            nombres = f'{contrato.ConEstId.PerNom1}'
            pdf_content = generar_reporte_contrato(request, contrato)
            """
            response = Response(content_type='application/pdf')
            response.write(pdf_content)
            """
            response = HttpResponse(pdf_content, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{apellidos}, {nombres}.pdf"'
            return response
            # return response
        except Contrato.DoesNotExist as e:
            return Response(data={'error': f'No se encontro el contrato con idetificador \'{id}\'' }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
