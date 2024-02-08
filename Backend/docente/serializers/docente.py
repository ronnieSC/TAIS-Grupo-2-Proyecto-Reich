
from rest_framework import serializers
from personas.models.tipo_documento import TipoDocumento
from docente.models.docente import Docente
from docente.models.telefonos import Telefono

from curso.models.curso import Curso
from rest_framework import status
from rest_framework.response import Response

from docente.serializers.telefonos import TelefonoSerializer
from usuario.serializers.usuario import UsuarioSerializer

from django.db import transaction

class DocenteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(
        source = "UsuCod",
        many = False,
        required=False
    )
    tipo_documento = serializers.PrimaryKeyRelatedField(
        queryset=TipoDocumento.objects.all(),
        source="PerTipDocId"
    )
    documento = serializers.CharField(source="PerNumDoc")
    apellido_paterno = serializers.CharField(source="PerApePat")
    apellido_materno = serializers.CharField(source="PerApeMat")
    primer_nombre = serializers.CharField(source="PerNom1")
    segundo_nombre = serializers.CharField(source="PerNom2", required=False) # opcional
    direccion = serializers.CharField(source='PerDir', required=False) # opcional
    ubigeo = serializers.CharField(source="PerUbi", required=False) # opcional
    fecha_nacimiento = serializers.CharField(source="PerFecNac")
    telefono = serializers.CharField(source="PerTel", required=False) #opcional
    experiencia = serializers.CharField(source="DocExp", required=False)
    especialidad = serializers.CharField(source="DocEsp", required=False)

    # Campo intrinseco al modelo - opcional
    telefonos_alternativos = TelefonoSerializer(
        source='telefono_set',
        many=True,
        required=False
    )

    # Campo intrinseco al modelo - opcional
    codigo_cursos = serializers.PrimaryKeyRelatedField(
        queryset=Curso.objects.all(),
        source="DocCur",
        many=True,
        required=False
    )

    class Meta:
        model = Docente
        fields = [
            'usuario',
            'tipo_documento',
            'documento',
            'primer_nombre',
            'segundo_nombre',
            'apellido_materno',
            'apellido_paterno',
            'fecha_nacimiento',
            'direccion', # opcional
            'ubigeo', # opcional
            'telefono', # opcional
            'telefonos_alternativos',
            'codigo_cursos',
            'experiencia',
            'especialidad',
            ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

    def create(self, validated_data):
        try:
            with transaction.atomic():
                telefonos_alternativos = validated_data.pop('telefono_set', None)
                cursos = validated_data.pop('DocCur', None)
                docente = Docente.objects.create(**validated_data)
                docente.DocCur.set(cursos)
                if telefonos_alternativos:
                    for tel in telefonos_alternativos:
                        numero_telefono= tel.pop('TelNum')
                        Telefono.objects.create(DocCod=docente, TelNum=numero_telefono)
        except Exception as e:
            raise serializers.ValidationError(str(e))
        return docente
    
    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                telefonos_alternativos = validated_data.pop('telefono_set', None)
                cursos = validated_data.pop('DocCur', None)
                instance = super().update(instance, validated_data)
                if cursos:
                    instance.DocCur.set(cursos)
                if telefonos_alternativos:
                    instance.telefono_set.all().delete()
                    for tel in telefonos_alternativos:
                        numero_telefono= tel.pop('TelNum')
                        Telefono.objects.create(DocCod=instance, TelNum=numero_telefono)
        except Exception as e:
            raise serializers.ValidationError(str(e))
        return instance

    def validate_documento(self, value):
        if self.instance and 'documento' in self.initial_data:
            if value == self.instance.PerTipDocId:
                return value
        docentes = Docente.objects.filter(PerNumDoc=value)
        if docentes.exists():
            raise serializers.ValidationError(detail='Ya existe un docente con este documento', code=status.HTTP_409_CONFLICT)
        return value
