
from django.db import models

from personas.models.persona import Persona
from usuario.models.usuario import Usuario
from django.contrib.auth.models import User

from usuario.gestor_usuarios import GestorUsuarios

class Docente(Persona):
    UsuCod = models.OneToOneField(Usuario, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Codigo de usuario")
    DocExp = models.TextField(max_length=256, blank=True, null=True, verbose_name="experiencia")
    DocEsp = models.TextField(max_length=256, blank=True, null=True, verbose_name="especialidad")
    DocCur = models.ManyToManyField('curso.curso', verbose_name="cursos")

    def __str__(self):
        return f'Docente: {self.PerNom1}'

    def save(self, *args, **kwargs):
        nombre = self.PerNom1
        paterno = self.PerApePat
        if not self.UsuCod:
            codigo_usuario = GestorUsuarios.crear_usuario_docente(
                nombre=nombre, 
                paterno=paterno, 
            )
            self.UsuCod = codigo_usuario
        super(Docente, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "docente"
        verbose_name_plural = "docentes"
    
    def getByDjangoUserId(user_id):
        django_user = User.objects.get(id=user_id)
        usuario = Usuario.objects.get(UseCod=django_user.id)
        docente = Docente.objects.get(UsuCod=usuario.id)
        return docente
