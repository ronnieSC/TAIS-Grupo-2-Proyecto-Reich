from django.contrib import admin
from usuario.models.rol import Rol
from usuario.models.usuario import Usuario

admin.site.register(Rol)
admin.site.register(Usuario)
