from django.db import models

from precios.models.precio import Precio
from usuario.models.usuario import Usuario
from responsable.models.responsable import Responsable

class Acuerdo(models.Model):
    AcuPreOri   = models.ForeignKey(Precio, verbose_name='monto original', on_delete=models.CASCADE, null=True, blank=True)
    AcuDes      = models.DecimalField(verbose_name='descuento', max_digits=5, decimal_places=2, null=True, blank=True)
    AcuMonPac   = models.DecimalField(verbose_name='monto pactado', max_digits=5, decimal_places=2, null=True, blank=True)
    AcuResPac   = models.ForeignKey(Responsable, verbose_name='responsable', on_delete=models.RESTRICT, null=True, blank=True)
    UsuCod      = models.ManyToManyField(Usuario, verbose_name='digitador(a)')
    
    class Meta:
        abstract = True