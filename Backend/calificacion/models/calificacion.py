from django.db import models
from estudiante.models.estudiante import Estudiante
from curso.models.curso import Curso
from docente.models.docente import Docente
from clase.models.nivel import Nivel
from clase.models.grado import Grado

class Calificacion(models.Model):
    EstCod = models.ForeignKey(Estudiante, on_delete=models.CASCADE, verbose_name="Estudiante")
    CurCod = models.ForeignKey(Curso, on_delete=models.CASCADE, verbose_name="Curso")
    DocCod = models.ForeignKey(Docente, on_delete=models.DO_NOTHING, verbose_name="Docente", blank=True, null=True)
    CalPar = models.FloatField(default=0, verbose_name="Nota de participacion", blank=True, null=True)
    CalTar = models.FloatField(default=0, verbose_name="Nota de tarea", blank=True, null=True)
    CalExa = models.FloatField(default=0, verbose_name="Nota de examen", blank=True, null=True)
    CalFec = models.CharField(max_length=32, verbose_name="Fecha")

    def __str__(self):
        return f'{self.EstCod.PerApePat} {self.EstCod.PerNom1} - P: {self.CalPar}, T: {self.CalTar}, E: {self.CalExa}'

    class Meta:
        verbose_name = "Calificación"
        verbose_name_plural = "Calificaciones"
