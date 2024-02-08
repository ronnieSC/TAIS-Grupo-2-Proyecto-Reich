from django.db import models

class Bimestre(models.Model):
    BimNum = models.IntegerField(default=1, verbose_name="bimestre")
    
    def __str__(self):
        return str(self.BimNum)
    
    class Meta:
        verbose_name = "bimestre"
        verbose_name_plural = "bimestres"