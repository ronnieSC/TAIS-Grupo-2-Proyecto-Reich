from django.db import models

class EntregaDocumento(models.Model):
    DocId = models.ForeignKey('contrato.Documento', on_delete=models.CASCADE, verbose_name="Documento")
    ConId = models.ForeignKey('contrato.contrato', on_delete=models.CASCADE, verbose_name="Contrato", blank=True, null=True)
    EntDocEnt = models.BooleanField(default=False, verbose_name='¿Se entrego el documento?')

    def __str__(self):
        return f'{self.DocId} - {"Entregado" if self.EntDocEnt else "No entregado"}'

    class Meta:
        verbose_name = "documento entregado"
        verbose_name = "documentos entregados"
        unique_together = ['DocId', 'ConId']