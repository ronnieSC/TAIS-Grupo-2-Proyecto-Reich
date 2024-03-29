# Generated by Django 4.2.3 on 2024-02-08 13:16

import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('personas', '0001_initial'),
        ('clase', '0001_initial'),
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PerNumDoc', models.CharField(max_length=20, unique=True, verbose_name='número de documento de identidad')),
                ('PerApePat', models.CharField(max_length=50, verbose_name='apellido paterno')),
                ('PerApeMat', models.CharField(max_length=50, verbose_name='apellido materno')),
                ('PerNom1', models.CharField(max_length=50, verbose_name='primer nombre')),
                ('PerNom2', models.CharField(blank=True, max_length=50, null=True, verbose_name='segundo nombre')),
                ('PerUbi', models.CharField(blank=True, max_length=6, null=True, validators=[django.core.validators.RegexValidator(code='nomatch', message='Se acepta solamente 6 digitos', regex='^.{6}$')], verbose_name='Ubigeo')),
                ('PerDir', models.CharField(blank=True, max_length=128, null=True, verbose_name='Direccion')),
                ('PerFecNac', models.CharField(blank=True, default=datetime.date.today, max_length=64, null=True, verbose_name='fecha de nacimiento')),
                ('PerTel', models.CharField(blank=True, max_length=16, null=True, validators=[django.core.validators.RegexValidator(message="El número de teléfono debe estar en el formato '+999999'. Se permiten como máximo 15 dígitos.", regex='^\\+?\\d{6,15}$')], verbose_name='número de teléfono')),
                ('EstImg', models.ImageField(blank=True, default='pics/imagen_no_disponible.png', null=True, upload_to='pics/estudiantes', verbose_name='foto')),
                ('EstAli', models.CharField(blank=True, max_length=30, null=True, verbose_name='alias (nombre de preferencia)')),
                ('EstColPro', models.CharField(blank=True, max_length=30, null=True, verbose_name='colegio de procedencia')),
                ('EstDes', models.CharField(blank=True, max_length=100, null=True, verbose_name='destreza')),
                ('EstCon', models.CharField(blank=True, max_length=100, null=True, verbose_name='condicion')),
                ('GraCod', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='clase.grado', verbose_name='grado')),
                ('NivCod', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='clase.nivel', verbose_name='nivel')),
                ('PerTipDocId', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='personas.tipodocumento', verbose_name='tipo de documento de identidad')),
                ('UsuCod', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='usuario.usuario', verbose_name='Codigo de usuario')),
            ],
            options={
                'verbose_name': 'estudiante',
                'verbose_name_plural': 'estudiantes',
            },
        ),
        migrations.CreateModel(
            name='Observacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ObsDes', models.CharField(max_length=256, verbose_name='descripción')),
                ('ObsFec', models.DateTimeField(auto_now_add=True, verbose_name='fecha')),
                ('EstId', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='estudiante.estudiante', verbose_name='estudiante')),
            ],
            options={
                'verbose_name': 'observación',
                'verbose_name_plural': 'observaciones',
            },
        ),
    ]
