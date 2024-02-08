from django.db import models

class Semana(models.Model):
    SemNum = models.IntegerField(default=1, verbose_name="semana")
    
    def __str__(self):
        return str(self.SemNum)
    
    class Meta:
        verbose_name = "semana"
        verbose_name_plural = "semanas"
    
    def get_last_or_create():
        semanas = Semana.objects.all()
        if len(semanas) > 0:
            return Semana.objects.last()
        return Semana.objects.create(SemNum=1)
