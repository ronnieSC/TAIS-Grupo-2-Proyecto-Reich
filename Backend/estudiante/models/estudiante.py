from typing import Any
from django.db import models
from personas.models.persona import Persona
from usuario.models.usuario import Usuario
from clase.models.grado import Grado
from clase.models.nivel import Nivel
from clase.models.clase import Clase
from usuario.gestor_usuarios import GestorUsuarios

class Estudiante(Persona):
    NivCod      = models.ForeignKey(Nivel, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name="nivel")
    GraCod      = models.ForeignKey(Grado, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name="grado")
    EstImg      = models.ImageField(upload_to='pics/estudiantes', null=True, blank=True, default='pics/imagen_no_disponible.png', verbose_name='foto')
    EstAli      = models.CharField(max_length=30, null = True, blank=True, verbose_name="alias (nombre de preferencia)")
    EstColPro   = models.CharField(max_length=64, null=True, blank=True, verbose_name="colegio de procedencia")
    EstDes      = models.CharField(max_length=100, null=True, blank=True, verbose_name="destreza")
    EstCon      = models.CharField(max_length=100, null=True, blank=True, verbose_name="condicion")
    UsuCod      = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Codigo de usuario")
    
    def __str__(self):
        return f'{self.PerApePat} {self.PerApeMat}, {self.PerNom1} ({self.PerNumDoc})'

    def save(self, *args, **kwargs):
        nombre = self.PerNom1
        paterno = self.PerApePat
        cantidad_estudiantes= Clase.get_cantidad_estudiantes(self.NivCod, self.GraCod)
        orden = f'0{cantidad_estudiantes+1}' if cantidad_estudiantes<9 else cantidad_estudiantes+1
        codigo = f'{self.NivCod.id}{self.GraCod.GraNum}{orden}'
        if not self.UsuCod:
            codigo_usuario = GestorUsuarios.crear_usuario_estudiante(
                nombre=nombre, 
                paterno=paterno, 
                codigo=codigo
            )
            self.UsuCod = codigo_usuario
        super(Estudiante, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "estudiante"
        verbose_name_plural = "estudiantes"