from django.contrib import admin

from fechaAcademica.models.semana import Semana
from fechaAcademica.models.dia import Dia
from fechaAcademica.models.bimestre import Bimestre
from fechaAcademica.models.ano_academico import AnoAcademico
from fechaAcademica.models.fecha_academica import FechaAcademica

# Register your models here.
admin.site.register(Semana)
admin.site.register(Dia)
admin.site.register(Bimestre)
admin.site.register(AnoAcademico)
admin.site.register(FechaAcademica)