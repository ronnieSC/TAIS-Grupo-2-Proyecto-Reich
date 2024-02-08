from django.db import models

from clase.models.nivel import Nivel
from clase.models.grado import Grado

from clase.models.estudiante_clase import EstudianteClase
from fechaAcademica.models.semana import Semana

from docente.models.docente import Docente

from django.apps import apps

class Clase(models.Model):
    ClaNivCod = models.ForeignKey(Nivel, on_delete=models.RESTRICT, verbose_name="nivel")
    ClaGraCod = models.ForeignKey(Grado, on_delete=models.RESTRICT, verbose_name="grado")
    ClaTutCod = models.ForeignKey(Docente, on_delete=models.RESTRICT, verbose_name="docente", blank=True, null=True)
    ClaNom = models.CharField(max_length=16, default="Nro. pendiente", blank=True, null=True, verbose_name="nombre de clase")

    class Meta:
        verbose_name = "clase"
        verbose_name_plural = "clases"
    
    def __str__(self):
        return f'{self.ClaNivCod.NivNom}: {self.ClaGraCod.GraNum}'

    def get_cantidad_estudiantes(nivel_instance, grado_instance):
        semana_instance = Semana.get_last_or_create()
        clase_instance = Clase.objects.filter(
            ClaNivCod=nivel_instance,
            ClaGraCod=grado_instance,
        )
        if not clase_instance.exists():
            return 0
        estudianteClase_instance = EstudianteClase.objects.filter(
            ClaCod=clase_instance[0],
            SemCod=semana_instance
        )
        return len(estudianteClase_instance)

    def getClaseInstance(nivel, grado):
        nivel_texto = "Primaria" if nivel==1 else "Secundaria"
        nivel_instance = Nivel.objects.filter(NivNom=nivel_texto).first()
        grado_instance = Grado.objects.filter(GraNum=grado).first()
        clase_instance = Clase.objects.get(
            ClaNivCod = nivel_instance,
            ClaGraCod = grado_instance,
        )
        return clase_instance

    def actualizarCorreos(nivel, grado):
        clase_instance = Clase.getClaseInstance(nivel, grado)
        estudiantes_clases = EstudianteClase.objects.filter(
            ClaCod = clase_instance,
        )
        estudiantes = apps.get_model('estudiante.Estudiante').objects.filter(id__in=[ec.EstCod.id for ec in estudiantes_clases])
        estudiantes = estudiantes.order_by('PerApePat')

        counter = 1
        for est in estudiantes:
            orden = f'0{counter}' if counter < 10 else f'{counter}'
            usuario = f'{str(nivel)}{str(grado)}{orden}.{est.PerNom1}.{est.PerApePat}@reich.edu.pe'.lower()
            django_user = est.UsuCod.UseCod
            django_user.username = usuario
            django_user.save()
            counter = counter + 1

    def instanciar_requisitos_clases():
        # Grados
        Grado.objects.get_or_create(GraNum="1")
        Grado.objects.get_or_create(GraNum="2")
        Grado.objects.get_or_create(GraNum="3")
        Grado.objects.get_or_create(GraNum="4")
        Grado.objects.get_or_create(GraNum="5")
        Grado.objects.get_or_create(GraNum="6")

        # Niveles
        Nivel.objects.get_or_create(NivNom="Primaria")
        Nivel.objects.get_or_create(NivNom="Secundaria")