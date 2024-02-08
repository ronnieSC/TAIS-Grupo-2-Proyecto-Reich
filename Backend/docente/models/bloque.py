
from django.db import models
from docente.models.docente import Docente
from docente.models.actividad import Actividad

from docente.models.horario import Horario

from curso.models.curso import Curso
from fechaAcademica.models.dia import Dia

class Bloque(models.Model):
    DocCod = models.ForeignKey(Docente, on_delete=models.RESTRICT, verbose_name="docente", null=True, blank=True)
    CurCod = models.ForeignKey(Curso, on_delete=models.RESTRICT, verbose_name="curso", null=True, blank=True)
    DiaCod = models.ForeignKey(Dia, on_delete=models.RESTRICT, verbose_name="dia")
    ActCod = models.ForeignKey(Actividad, on_delete=models.RESTRICT, verbose_name="actividad")
    HorCod = models.ForeignKey(Horario, on_delete=models.CASCADE, verbose_name="horario")

    BloHorIni = models.CharField(verbose_name="hora de inicio", max_length=32)
    BloHorFin = models.CharField(verbose_name="hora de fin", max_length=32)

    class Meta:
        verbose_name = "bloque"
        verbose_name_plural = "bloques"
    
    def __str__(self):
        return f'{self.id}. {self.ActCod.ActNom} {self.DiaCod.DiaNom} {self.BloHorIni} - {self.BloHorFin}'