from django.db import models

from personas.models.persona import Persona
from usuario.models.usuario import Usuario

from usuario.gestor_usuarios import GestorUsuarios

class Apoderado(Persona):    
    ApoNivEst   = models.CharField(max_length=30, verbose_name="Nivel de estudios", null=True, blank=True)
    ApoCenTra   = models.CharField(max_length=30, verbose_name="Centro de trabajo", null=True, blank=True)
    ApoConId    = models.ManyToManyField('contrato.contrato', through='Parentesco', verbose_name="contratos")
    UsuCod      = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Codigo de usuario")
    ApoPri      = models.BooleanField(default=False, blank=True, null=True)
    
    def __str__(self):
        return f'{self.PerApePat} {self.PerApeMat}, {self.PerNom1} ({self.PerNumDoc})'
    
    def save(self, *args, **kwargs):
        # Generacion de un usuario para los estudiantes de forma automatica
        nombre = self.PerNom1
        paterno = self.PerApePat
        if not self.UsuCod:
            codigo_usuario = GestorUsuarios.crear_usuario_apoderado(
                nombre=nombre, 
                paterno=paterno
            )
            self.UsuCod = codigo_usuario
        super(Apoderado, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "apoderado"
        verbose_name_plural = "apoderados"