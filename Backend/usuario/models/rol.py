from main.settings import ROLES
from django.db import models
from main.settings import INTERFACE_ROLES

class Rol(models.Model):
    RolNom = models.CharField(max_length=32, choices=ROLES, verbose_name="Rol")
    RolDes = models.CharField(max_length=64, verbose_name="Descripcion")

    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"
    
    def __str__(self):
        return f'{self.RolNom}'
    
    def instanciar_roles():
        Rol.objects.get_or_create(
            RolNom = INTERFACE_ROLES.ADMINISTRADOR,
            RolDes = "Acceso a todo el sistema, ademas del panel de administracion"
        )
        Rol.objects.get_or_create(
            RolNom = INTERFACE_ROLES.DOCENTE,
            RolDes = "Acceso a modulos de calificaciones"
        )
        Rol.objects.get_or_create(
            RolNom = INTERFACE_ROLES.APODERADO,
            RolDes = "Acceso a informacion relacionada con el estudiante a su cargo"
        )
        Rol.objects.get_or_create(
            RolNom = INTERFACE_ROLES.ESTUDIANTE,
            RolDes = "Acceso a informacion relacionada con el estudiante"
        )