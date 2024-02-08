from django.db import models

class EstudianteClase(models.Model):
    EstCod = models.ForeignKey('estudiante.Estudiante', on_delete=models.CASCADE, verbose_name="estudiante")
    ClaCod = models.ForeignKey('clase.Clase', on_delete=models.CASCADE, verbose_name="clase")
    SemCod = models.ForeignKey('fechaAcademica.Semana', on_delete=models.RESTRICT, null=True, blank=True, default=1, verbose_name="semana")

    class Meta:
        verbose_name = "Estudiante_Clase"
        verbose_name_plural = "Estudiantes_Clase"
        unique_together = ['EstCod', 'ClaCod', 'SemCod']

    def __str__(self):
        return f'{self.EstCod.PerNom1} {self.EstCod.PerApePat} - {self.ClaCod.__str__()}'
