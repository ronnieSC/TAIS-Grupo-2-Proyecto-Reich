from contrato.models.acuerdo import Acuerdo

class AcuerdoGuia(Acuerdo):
    def __str__(self):
        return f'Acuerdo de pagos de guías'
    
    class Meta:
        verbose_name = 'acuerdo de pagos de guías'
        verbose_name_plural = 'acuerdos de pagos de guías'