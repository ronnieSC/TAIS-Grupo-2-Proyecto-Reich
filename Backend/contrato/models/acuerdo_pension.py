from django.db import models
from contrato.models.acuerdo import Acuerdo
class AcuerdoPension(Acuerdo):
    AcuPenFecPag = models.CharField(verbose_name='fechas de pago', max_length=100)
    
    def __str__(self):
        return f'Acuerdo de pensión'
    
    class Meta:
        verbose_name = 'acuerdo de pensiónes'
        verbose_name_plural = 'acuerdos de pensiones'