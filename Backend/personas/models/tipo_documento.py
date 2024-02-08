from django.db import models

class TipoDocumento(models.Model):
    TipDocTip       = models.CharField(verbose_name='tipo de documento', max_length=16)
    TipDocDesCor    = models.CharField(verbose_name='descripción corta', max_length=64)
    TipDocDesLar    = models.CharField(verbose_name='descripción larga', max_length=64)
    
    def __str__(self):
        return f'{self.TipDocDesCor}'
    
    class Meta:
        verbose_name = 'tipo de documento de identidad'
        verbose_name_plural = 'tipos de documento de identidad'
        ordering = ['TipDocTip']