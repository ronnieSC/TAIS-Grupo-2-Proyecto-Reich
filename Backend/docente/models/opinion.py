from django.db import models

from docente.models.docente import Docente

class Opinion(models.Model):
    DocCod = models.ForeignKey(Docente, on_delete=models.CASCADE, verbose_name="codigo_docente")
    OpiOpi = models.TextField(max_length=1024, verbose_name="Opinion")

    def __str__(self):
        return f'Docente {self.DocCod}: {self.OpiOpi}'
