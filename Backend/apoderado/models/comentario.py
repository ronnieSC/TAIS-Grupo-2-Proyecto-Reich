
from django.db import models
from .parentesco import Parentesco

class Comentario(models.Model):
    ParCod = models.ForeignKey(Parentesco, on_delete=models.CASCADE, verbose_name="codigo apoderado")
    ComCom = models.CharField(max_length=256, verbose_name="comentario")
    ComFec = models.CharField(max_length=32, verbose_name="fecha")
    
    class Meta:
        verbose_name = "comentario"
        verbose_name_plural = "comentarios"

