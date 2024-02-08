from django.db import models

class Nivel(models.Model):
    NivNom = models.CharField(max_length=32, verbose_name="nivel")
    
    def __str__(self):
        return self.NivNom
    
    class Meta:
        verbose_name = "nivel"
        verbose_name_plural = "niveles"
        ordering = ['NivNom']