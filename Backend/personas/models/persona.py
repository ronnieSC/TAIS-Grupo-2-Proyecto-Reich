from django.db import models

from django.core.validators import RegexValidator
from datetime import date

# importando los modelos
from personas.models.tipo_documento import TipoDocumento

class Persona(models.Model):
    PerTipDocId = models.ForeignKey(TipoDocumento, verbose_name='tipo de documento de identidad', on_delete=models.RESTRICT)
    PerNumDoc   = models.CharField(verbose_name='número de documento de identidad', max_length=20, unique=True)
    PerApePat   = models.CharField(verbose_name='apellido paterno', max_length=50)
    PerApeMat   = models.CharField(verbose_name='apellido materno', max_length=50)
    PerNom1     = models.CharField(verbose_name='primer nombre', max_length=50)
    PerNom2     = models.CharField(verbose_name='segundo nombre', max_length=50, blank=True, null=True)
    PerUbi      = models.CharField(max_length=6, validators=[RegexValidator(regex='^.{6}$', message='Se acepta solamente 6 digitos', code='nomatch')], null=True, blank=True, verbose_name='Ubigeo')
    PerDir      = models.CharField(max_length=128, null=True, blank=True, verbose_name='Direccion')
    PerFecNac   = models.CharField(max_length=64, verbose_name='fecha de nacimiento', default=date.today, null=True, blank=True)
    telefono_regex = RegexValidator(regex=r'^\+?\d{6,15}$', message="El número de teléfono debe estar en el formato '+999999'. Se permiten como máximo 15 dígitos.")
    PerTel      = models.CharField(validators=[telefono_regex], max_length=16, null=True, blank=True, verbose_name='número de teléfono')
    
    def __str__(self):
        return f'{self.PerApePat} {self.PerApeMat}, {self.PerNom1} ({self.PerNumDoc})'
    
    class Meta:
        abstract = True

    def instanciar_requisitos_persona():
        TipoDocumento.objects.get_or_create(
            TipDocTip="Identidad",
            TipDocDesCor="DNI",
            TipDocDesLar="Documento Nacional de Identidad"
        )
        TipoDocumento.objects.get_or_create(
            TipDocTip="Extranjeria",
            TipDocDesCor="CE",
            TipDocDesLar="Carnet de Extranjeria"
        )