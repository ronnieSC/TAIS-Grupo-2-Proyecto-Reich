from django.contrib import admin

from apoderado.models.apoderado import Apoderado
from apoderado.models.parentesco import Parentesco

admin.site.register(Apoderado)
admin.site.register(Parentesco)