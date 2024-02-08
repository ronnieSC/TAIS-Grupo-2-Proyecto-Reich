from django.db import models

from fechaAcademica.models.ano_academico import AnoAcademico
from estudiante.models.estudiante import Estudiante

from contrato.models.acuerdo_matricula import AcuerdoMatricula
from contrato.models.acuerdo_pension import AcuerdoPension
from contrato.models.acuerdo_guia import AcuerdoGuia
from responsable.models.responsable import Responsable

class Contrato(models.Model):
    ConAnoAca   = models.ForeignKey(AnoAcademico, on_delete=models.RESTRICT, null=True, blank=True, verbose_name='año académico')
    ConEstId    = models.ForeignKey(Estudiante, on_delete=models.CASCADE, verbose_name='estudiante')
    ConParId    = models.ManyToManyField('apoderado.apoderado', through='apoderado.parentesco')
    ConFec      = models.DateField(auto_now_add=True, verbose_name='fecha')
    ConResInf   = models.ForeignKey(Responsable, on_delete=models.RESTRICT, null=True, blank=True, verbose_name='responsable de la información')
    ConConEst   = models.CharField(max_length=10, verbose_name='Condición')
    ConFir      = models.BooleanField(default=False, verbose_name='el contrato está firmado')
    ConAcuMat   = models.OneToOneField(AcuerdoMatricula, on_delete=models.RESTRICT, verbose_name='acuerdo de matrícula')
    ConAcuPen   = models.OneToOneField(AcuerdoPension, on_delete=models.RESTRICT, verbose_name='acuerdo de pago de pensiones')
    ConAcuGui   = models.OneToOneField(AcuerdoGuia, on_delete=models.RESTRICT, null=True, blank=True, verbose_name='acuerdo de pago de las guías')
    ConObs      = models.CharField(max_length=300, verbose_name='comentarios / observaciones')
    
    def __str__(self):
        return f'{self.ConAnoAca} - {self.ConEstId}'

    def delete(self, *args, **kwargs):
        apoderado = self.ConParId.all()[0]
        cantidad_contratos = apoderado.ApoConId.count()
        if cantidad_contratos == 1:
            apoderado.UsuCod.UseCod.delete()

        # eliminar al estudiante
        self.ConEstId.delete()
        self.ConEstId.UsuCod.UseCod.delete()
        # eliminar los acuerdos
        self.ConAcuMat.delete()
        self.ConAcuPen.delete()
        self.ConAcuGui.delete()
        super(Contrato, self).delete(*args, **kwargs)
    
    class Meta:
        verbose_name = 'contrato'
        verbose_name_plural = 'contratos'