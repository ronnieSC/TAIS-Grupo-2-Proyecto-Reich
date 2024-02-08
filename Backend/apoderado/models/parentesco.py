from django.db import models

from apoderado.models.apoderado import Apoderado

class Parentesco(models.Model):
    ParApoId = models.ForeignKey(Apoderado, on_delete=models.CASCADE, verbose_name="apoderado")
    ParConId = models.ForeignKey('contrato.contrato', on_delete=models.CASCADE, blank=True, null=True, verbose_name="estudiante")
    ParPar  = models.CharField(max_length=16, verbose_name='parentesco')
    
    def __str__(self):
        return f'{self.ParApoId} es {self.ParPar} de {self.ParConId}'

    class Meta:
        verbose_name = "parentesco apoderado-estudiante"
        verbose_name_plural = "parentescos apoderados-estudiantes"

    def delete(self, *args, **kwargs):
        contratos = self.ParApoId.ApoConId.all()
        for contrato in contratos:
            if contrato.ConParId.count() == 1:
                return
        self.ParApoId.delete()
        super(Parentesco, self).delete(*args, **kwargs)
    