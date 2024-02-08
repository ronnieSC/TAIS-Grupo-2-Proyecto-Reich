
from django.db import models
from usuario.models.usuario import Usuario
from usuario.gestor_usuarios import GestorUsuarios
from personas.models.persona import Persona

class Administrador(Persona):
    UsuCod = models.OneToOneField(Usuario, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Codigo de usuario")

    def save(self, *args, **kwargs):
        nombre = self.PerNom1
        paterno = self.PerApePat
        if not self.UsuCod:
            codigo_usuario = GestorUsuarios.crear_usuario_administrador(
                nombre=nombre, 
                paterno=paterno
            )
            self.UsuCod = codigo_usuario
        super(Administrador, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Administrador"
        verbose_name_plural = "Administradores"
    
    def __str__(self):
        return f'{self.PerNom1}'

