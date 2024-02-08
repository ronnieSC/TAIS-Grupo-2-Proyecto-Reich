
from django.db import models

class Documento(models.Model):
    DocTipDoc = models.CharField(max_length=32, verbose_name="Documento")

    def __str__(self):
        return f'{self.DocTipDoc}'

    class Meta:
        verbose_name = "documento"
        verbose_name_plural = "documentos"
    
    def instanciar_documentos():
        Documento.objects.get_or_create(DocTipDoc="Constancia de vacante")
        Documento.objects.get_or_create(DocTipDoc="Declaración jurada")
        Documento.objects.get_or_create(DocTipDoc="Ficha única de matrícula")
        Documento.objects.get_or_create(DocTipDoc="Resolución de matrícula")
        Documento.objects.get_or_create(DocTipDoc="Certificado de estudio")
        Documento.objects.get_or_create(DocTipDoc="DNI del estudiante")
        Documento.objects.get_or_create(DocTipDoc="DNI del padre")
        Documento.objects.get_or_create(DocTipDoc="DNI de la madre")
