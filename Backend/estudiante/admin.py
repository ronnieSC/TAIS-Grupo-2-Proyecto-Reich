from django.contrib import admin

from estudiante.models.estudiante import Estudiante
from estudiante.models.observacion import Observacion

admin.site.register(Estudiante)
admin.site.register(Observacion)
