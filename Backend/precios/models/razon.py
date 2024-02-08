from django.db import models

class Razon(models.Model):
    RazNom  = models.CharField(verbose_name='motivo', max_length=15)
    
    def __str__(self):
        return f'{self.RazNom}'
    
    class Meta:
        verbose_name = 'razón'
        verbose_name_plural = 'razones'
    
    def instanciar_razones():
        Razon.objects.get_or_create(RazNom="Matrícula")
        Razon.objects.get_or_create(RazNom="Pensión")
        Razon.objects.get_or_create(RazNom="Guía")