# Generated by Django 4.2.3 on 2024-02-08 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clase', '0001_initial'),
        ('fechaAcademica', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Razon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('RazNom', models.CharField(max_length=15, verbose_name='motivo')),
            ],
            options={
                'verbose_name': 'razón',
                'verbose_name_plural': 'razones',
            },
        ),
        migrations.CreateModel(
            name='Precio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PreMon', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='monto')),
                ('PreAnoAcaId', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='fechaAcademica.anoacademico', verbose_name='año académico')),
                ('PreNivId', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='clase.nivel', verbose_name='nivel')),
                ('PreRazId', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='precios.razon', verbose_name='razón')),
            ],
            options={
                'verbose_name': 'precio',
                'verbose_name_plural': 'precios',
                'ordering': ['PreNivId'],
            },
        ),
    ]
