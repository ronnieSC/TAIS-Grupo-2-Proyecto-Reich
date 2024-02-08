
from django.contrib.auth.models import User
from django.db import models
from usuario.models.rol import Rol

class Usuario(models.Model):
    RolCod = models.ForeignKey(Rol, verbose_name="Rol", on_delete=models.RESTRICT)
    UseCod = models.OneToOneField(User, verbose_name="Django User", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return f'{self.UseCod.username} ({self.RolCod.RolNom})'
