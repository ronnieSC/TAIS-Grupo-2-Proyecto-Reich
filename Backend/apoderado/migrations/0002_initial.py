# Generated by Django 4.2.3 on 2024-02-06 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('personas', '0001_initial'),
        ('contrato', '0001_initial'),
        ('apoderado', '0001_initial'),
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parentesco',
            name='ParConId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contrato.contrato', verbose_name='estudiante'),
        ),
        migrations.AddField(
            model_name='comentario',
            name='ParCod',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apoderado.parentesco', verbose_name='codigo apoderado'),
        ),
        migrations.AddField(
            model_name='apoderado',
            name='ApoConId',
            field=models.ManyToManyField(through='apoderado.Parentesco', to='contrato.contrato', verbose_name='contratos'),
        ),
        migrations.AddField(
            model_name='apoderado',
            name='PerTipDocId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='personas.tipodocumento', verbose_name='tipo de documento de identidad'),
        ),
        migrations.AddField(
            model_name='apoderado',
            name='UsuCod',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='usuario.usuario', verbose_name='Codigo de usuario'),
        ),
    ]
