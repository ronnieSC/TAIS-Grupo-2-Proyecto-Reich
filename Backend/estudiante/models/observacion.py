from django.db import models

from estudiante.models.estudiante import Estudiante

class Observacion(models.Model):
    EstId = models.ForeignKey(Estudiante, on_delete=models.DO_NOTHING, verbose_name="estudiante")
    ObsDes = models.CharField(max_length=256, verbose_name="descripción")
    ObsFec = models.DateTimeField(verbose_name="fecha", auto_now_add=True)
    
    def __str__(self):
        return f'{self.EstId.PerNom1} {self.EstId.PerApePat} {self.EstId.PerApeMat}-{self.ObsFec}'
    
    class Meta:
        verbose_name = "observación"
        verbose_name_plural = "observaciones"