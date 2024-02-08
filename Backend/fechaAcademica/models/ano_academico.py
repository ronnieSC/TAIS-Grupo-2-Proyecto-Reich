from django.db import models

class AnoAcademico(models.Model):
    AnoAcaNum = models.IntegerField(default=2000, unique=True, verbose_name="año")
    
    def __str__(self):
        return str(self.AnoAcaNum)
    
    class Meta:
        verbose_name = "año academico"
        verbose_name_plural = "años academicos"
        ordering = ['AnoAcaNum']