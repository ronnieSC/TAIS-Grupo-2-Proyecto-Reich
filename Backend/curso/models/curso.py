
from django.db import models

class Curso(models.Model):
    CurNom = models.CharField(max_length=32, verbose_name="Curso", unique=True)

    class Meta:
        verbose_name = "curso"
        verbose_name_plural = "cursos"

    def __str__(self):
        return f'{self.id}. {self.CurNom}'

    def instanciar_cursos():
        Curso.objects.get_or_create(CurNom="PsT")
        Curso.objects.get_or_create(CurNom="Arte")
        Curso.objects.get_or_create(CurNom="Ingles")
        Curso.objects.get_or_create(CurNom="Algebra")
        Curso.objects.get_or_create(CurNom="Tutoria")
        Curso.objects.get_or_create(CurNom="Biologia")
        Curso.objects.get_or_create(CurNom="Fisica 1")
        Curso.objects.get_or_create(CurNom="Fisica 2")
        Curso.objects.get_or_create(CurNom="Historia")
        Curso.objects.get_or_create(CurNom="Lenguaje")
        Curso.objects.get_or_create(CurNom="Geografia")
        Curso.objects.get_or_create(CurNom="Quimica 1")
        Curso.objects.get_or_create(CurNom="Quimica 2")
        Curso.objects.get_or_create(CurNom="Aritmetica")
        Curso.objects.get_or_create(CurNom="Ed. Fisica")
        Curso.objects.get_or_create(CurNom="Psicologia")
        Curso.objects.get_or_create(CurNom="Comp. Textos")
        Curso.objects.get_or_create(CurNom="Raz. Matematico")