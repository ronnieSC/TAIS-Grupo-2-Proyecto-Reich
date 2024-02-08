
from django.db import models

class Actividad(models.Model):
    ActNom = models.CharField(verbose_name="actividad", max_length=32, unique=True)

    class Meta:
        verbose_name = "actividad"
        verbose_name_plural = "actividades"
    
    def __str__(self):
        return self.ActNom
    
    def instanciar_actividades():
        Actividad.objects.get_or_create(ActNom="Recreo(30)")
        Actividad.objects.get_or_create(ActNom="Recreo(40)")
        Actividad.objects.get_or_create(ActNom="Almuerzo")
        Actividad.objects.get_or_create(ActNom="Tarea")
        Actividad.objects.get_or_create(ActNom="Examen")
        Actividad.objects.get_or_create(ActNom="Formacion")