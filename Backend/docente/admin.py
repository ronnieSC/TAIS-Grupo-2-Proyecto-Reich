from django.contrib import admin

from docente.models.docente import Docente
from docente.models.bloque import Bloque 
from docente.models.horario import Horario
from docente.models.actividad import Actividad
from docente.models.opinion import Opinion
from docente.models.telefonos import Telefono 

# Register your models here.
admin.site.register(Docente)
admin.site.register(Opinion)
admin.site.register(Horario)
admin.site.register(Bloque)
admin.site.register(Actividad)
admin.site.register(Telefono)