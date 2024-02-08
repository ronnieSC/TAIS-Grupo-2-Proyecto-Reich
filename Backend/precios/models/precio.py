from django.db import models

from fechaAcademica.models.ano_academico import AnoAcademico
from clase.models.nivel import Nivel
from precios.models.razon import Razon

class Precio(models.Model):
    PreAnoAcaId = models.ForeignKey(AnoAcademico, verbose_name='año académico', on_delete=models.RESTRICT)
    PreNivId    = models.ForeignKey(Nivel, verbose_name='nivel', on_delete=models.RESTRICT)
    PreRazId    = models.ForeignKey(Razon, verbose_name='razón', on_delete=models.RESTRICT)
    PreMon      = models.DecimalField(verbose_name='monto', max_digits=5, decimal_places=2)
    
    def __str__(self):
        return f'{self.PreNivId} {self.PreAnoAcaId} ({self.PreRazId}): {self.PreMon}'
    
    class Meta:
        verbose_name = 'precio'
        verbose_name_plural = 'precios'
        ordering = ['PreNivId']