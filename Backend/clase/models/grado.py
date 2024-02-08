from django.db import models

class Grado(models.Model):
    GraNum = models.CharField(max_length=32, verbose_name="grado")
    
    def __str__(self):
        return self.GraNum
    
    class Meta:
        verbose_name = "grado"
        verbose_name_plural = "grados"
        ordering = ['GraNum']