from django.db import models

class Dia(models.Model):
    DiaNom = models.TextField(max_length=16, verbose_name="dia")
    
    def __str__(self):
        return str(self.DiaNom)
    
    class Meta:
        verbose_name = "dia"
        verbose_name_plural = "dias"
    