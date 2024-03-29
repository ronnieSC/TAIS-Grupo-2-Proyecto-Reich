# Generated by Django 4.2.3 on 2024-02-08 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('apoderado', '0001_initial'),
        ('fechaAcademica', '0001_initial'),
        ('estudiante', '0001_initial'),
        ('responsable', '0001_initial'),
        ('precios', '0001_initial'),
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AcuerdoGuia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('AcuDes', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='descuento')),
                ('AcuMonPac', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='monto pactado')),
                ('AcuPreOri', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='precios.precio', verbose_name='monto original')),
                ('AcuResPac', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='responsable.responsable', verbose_name='responsable')),
                ('UsuCod', models.ManyToManyField(to='usuario.usuario', verbose_name='digitador(a)')),
            ],
            options={
                'verbose_name': 'acuerdo de pagos de guías',
                'verbose_name_plural': 'acuerdos de pagos de guías',
            },
        ),
        migrations.CreateModel(
            name='AcuerdoMatricula',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('AcuDes', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='descuento')),
                ('AcuMonPac', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='monto pactado')),
                ('AcuPreOri', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='precios.precio', verbose_name='monto original')),
                ('AcuResPac', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='responsable.responsable', verbose_name='responsable')),
                ('UsuCod', models.ManyToManyField(to='usuario.usuario', verbose_name='digitador(a)')),
            ],
            options={
                'verbose_name': 'acuerdo de matrícula',
                'verbose_name_plural': 'acuerdos de matrículas',
            },
        ),
        migrations.CreateModel(
            name='AcuerdoPension',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('AcuDes', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='descuento')),
                ('AcuMonPac', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='monto pactado')),
                ('AcuPenFecPag', models.CharField(max_length=100, verbose_name='fechas de pago')),
                ('AcuPreOri', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='precios.precio', verbose_name='monto original')),
                ('AcuResPac', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='responsable.responsable', verbose_name='responsable')),
                ('UsuCod', models.ManyToManyField(to='usuario.usuario', verbose_name='digitador(a)')),
            ],
            options={
                'verbose_name': 'acuerdo de pensiónes',
                'verbose_name_plural': 'acuerdos de pensiones',
            },
        ),
        migrations.CreateModel(
            name='Contrato',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ConFec', models.DateField(auto_now_add=True, verbose_name='fecha')),
                ('ConConEst', models.CharField(max_length=10, verbose_name='Condición')),
                ('ConFir', models.BooleanField(default=False, verbose_name='el contrato está firmado')),
                ('ConObs', models.CharField(max_length=300, verbose_name='comentarios / observaciones')),
                ('ConAcuGui', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='contrato.acuerdoguia', verbose_name='acuerdo de pago de las guías')),
                ('ConAcuMat', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to='contrato.acuerdomatricula', verbose_name='acuerdo de matrícula')),
                ('ConAcuPen', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to='contrato.acuerdopension', verbose_name='acuerdo de pago de pensiones')),
                ('ConAnoAca', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='fechaAcademica.anoacademico', verbose_name='año académico')),
                ('ConEstId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='estudiante.estudiante', verbose_name='estudiante')),
                ('ConParId', models.ManyToManyField(through='apoderado.Parentesco', to='apoderado.apoderado')),
                ('ConResInf', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='responsable.responsable', verbose_name='responsable de la información')),
            ],
            options={
                'verbose_name': 'contrato',
                'verbose_name_plural': 'contratos',
            },
        ),
        migrations.CreateModel(
            name='Documento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DocTipDoc', models.CharField(max_length=32, verbose_name='Documento')),
            ],
            options={
                'verbose_name': 'documento',
                'verbose_name_plural': 'documentos',
            },
        ),
        migrations.CreateModel(
            name='EntregaDocumento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EntDocEnt', models.BooleanField(default=False, verbose_name='¿Se entrego el documento?')),
                ('ConId', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contrato.contrato', verbose_name='Contrato')),
                ('DocId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contrato.documento', verbose_name='Documento')),
            ],
            options={
                'verbose_name': 'documentos entregados',
                'unique_together': {('DocId', 'ConId')},
            },
        ),
    ]
