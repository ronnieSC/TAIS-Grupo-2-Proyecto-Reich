from contrato.models.acuerdo import Acuerdo

class AcuerdoMatricula(Acuerdo):
    def __str__(self):
        return f'Matrícula'

    class Meta:
        verbose_name = 'acuerdo de matrícula'
        verbose_name_plural = 'acuerdos de matrículas'