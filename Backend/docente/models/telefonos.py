
from django.db import models 
class Telefono(models.Model):
    DocCod = models.ForeignKey('docente.Docente', on_delete=models.CASCADE, verbose_name="docente")
    TelNum = models.CharField(max_length=32, verbose_name="telefonos")

    class Meta:
        verbose_name = "telefonos"
        verbose_name_plural = "telefonos"
    
    def __str__(self):
        return f'Docente: {self.DocCod.PerNom1} - {self.TelNum}'
    