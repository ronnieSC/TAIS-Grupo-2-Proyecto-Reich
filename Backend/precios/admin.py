from django.contrib import admin

from precios.models.razon import Razon
from precios.models.precio import Precio

# Register your models here.
admin.site.register(Razon)
admin.site.register(Precio)