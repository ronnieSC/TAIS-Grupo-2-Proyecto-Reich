from django.contrib import admin

from contrato.models.acuerdo_matricula import AcuerdoMatricula
from contrato.models.acuerdo_pension import AcuerdoPension
from contrato.models.acuerdo_guia import AcuerdoGuia
from contrato.models.contrato import Contrato
from contrato.models.documento import Documento
from contrato.models.entrega_documento import EntregaDocumento

# Register your models here.

admin.site.register(AcuerdoMatricula)
admin.site.register(AcuerdoPension)
admin.site.register(AcuerdoGuia)
admin.site.register(Contrato)
admin.site.register(Documento)
admin.site.register(EntregaDocumento)