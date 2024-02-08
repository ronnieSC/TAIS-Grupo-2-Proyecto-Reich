from django.db import models

from fechaAcademica.models.dia import Dia 
from fechaAcademica.models.semana import Semana
from fechaAcademica.models.bimestre import Bimestre
from fechaAcademica.models.ano_academico import AnoAcademico

class FechaAcademica(models.Model):
    SemId = models.ForeignKey(Semana, on_delete=models.RESTRICT, verbose_name="semana")
    BimId = models.ForeignKey(Bimestre, on_delete=models.RESTRICT, verbose_name="bimestre")
    AnoId = models.ForeignKey(AnoAcademico, on_delete=models.RESTRICT, verbose_name="año")
    
    def __str__(self):
        return f'A:{self.AnoId} B:{self.BimId} S:{self.SemId}'
    
    class Meta:
        verbose_name = "fecha académica"
        verbose_name_plural = "fechas académicas"
    
    def instanciar_fechas():
        # Dias
        Dia.objects.get_or_create(DiaNom="Lunes")
        Dia.objects.get_or_create(DiaNom="Martes")
        Dia.objects.get_or_create(DiaNom="Miércoles")
        Dia.objects.get_or_create(DiaNom="Jueves")
        Dia.objects.get_or_create(DiaNom="Viernes")
        Dia.objects.get_or_create(DiaNom="Sábado")
        Dia.objects.get_or_create(DiaNom="Domingo")

        # Semanas
        Semana.objects.get_or_create(SemNum=1)
        Semana.objects.get_or_create(SemNum=2)
        Semana.objects.get_or_create(SemNum=3)
        Semana.objects.get_or_create(SemNum=4)
        Semana.objects.get_or_create(SemNum=5)
        Semana.objects.get_or_create(SemNum=6)
        Semana.objects.get_or_create(SemNum=7)
        Semana.objects.get_or_create(SemNum=8)

        # Bimestres
        Bimestre.objects.get_or_create(BimNum=1)
        Bimestre.objects.get_or_create(BimNum=2)
        Bimestre.objects.get_or_create(BimNum=3)
        Bimestre.objects.get_or_create(BimNum=4)
        Bimestre.objects.get_or_create(BimNum=5)
        Bimestre.objects.get_or_create(BimNum=6)

        # Años
        AnoAcademico.objects.get_or_create(AnoAcaNum=2023)
        AnoAcademico.objects.get_or_create(AnoAcaNum=2024)