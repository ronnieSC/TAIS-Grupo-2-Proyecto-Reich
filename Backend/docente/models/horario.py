from django.db import models
from clase.models.nivel import Nivel
from clase.models.grado import Grado

class Horario(models.Model):
    NivCod = models.ForeignKey(Nivel, on_delete=models.RESTRICT, verbose_name="nivel")
    GraCod = models.ForeignKey(Grado, on_delete=models.RESTRICT, verbose_name="grado")
    HorAla = models.BooleanField(default=False, blank=True, null=True, verbose_name="alarma")

    class Meta:
        verbose_name = "horario"
        verbose_name_plural = "horarios"

    def __str__(self):
        return f'Horario: {self.NivCod.NivNom}-{self.GraCod.GraNum}'
