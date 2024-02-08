from django.contrib import admin
from clase.models.grado import Grado 
from clase.models.nivel import Nivel 
from clase.models.clase import Clase 
from clase.models.estudiante_clase import EstudianteClase

admin.site.register(Grado)
admin.site.register(Nivel)
admin.site.register(Clase)
admin.site.register(EstudianteClase)
