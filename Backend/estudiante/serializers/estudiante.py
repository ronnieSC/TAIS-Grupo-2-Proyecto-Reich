from rest_framework import serializers
from personas.models.tipo_documento import TipoDocumento
from usuario.serializers.usuario import UsuarioSerializer

from estudiante.models.estudiante import Estudiante
from contrato.models.contrato import Contrato

from clase.models.nivel import Nivel
from clase.models.grado import Grado

from rest_framework.response import Response
from rest_framework import status

class EstudianteSerializer(serializers.ModelSerializer):
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
    segundo_nombre = serializers.CharField(source="PerNom2", required=False) #opcional
    fecha_nacimiento = serializers.CharField(source="PerFecNac")
    direccion = serializers.CharField(source="PerDir", required=False) # opcional
    ubigeo = serializers.CharField(source="PerUbi", required=False) # opcional
    telefono = serializers.CharField(source="PerTel", required=False) #opcional

    colegio_procedencia = serializers.CharField(source="EstColPro", required=False) # opcional
    destreza = serializers.CharField(source="EstDes", required=False) #opcional
    alias = serializers.CharField(source="EstAli", required=False) # opcional
    foto = serializers.CharField(source="EstImg", required=False) # opcional

    nivel_codigo = serializers.PrimaryKeyRelatedField(
        source="NivCod",
        many=False,
        queryset=Nivel.objects.all()
    )
    grado_codigo = serializers.PrimaryKeyRelatedField(
        source="GraCod",
        many=False,
        queryset=Grado.objects.all()
    )

    class Meta:
        model = Estudiante
        fields = [
            'usuario',
            'tipo_documento',
            'documento',
            'primer_nombre',
            'segundo_nombre',
            'apellido_materno',
            'apellido_paterno',
            'fecha_nacimiento',
            'colegio_procedencia',
            'destreza',
            'grado_codigo',
            'nivel_codigo',

            'direccion', # opcional
            'ubigeo', # opcional
            'telefono', # opcional
            'alias', # opcional
            'foto' # opcional
            ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        # Buscando los contratos del estudiante
        contratos = Contrato.objects.filter(ConEstId=instance.pk)
        # Tomamos el ultimo contrato si es que existe
        if len(contratos)>0:
            representation['contrato_codigo'] = contratos.last().pk
        return representation

    def validate_documento(self, value):
        if self.instance and 'documento' in self.initial_data:
            if value == self.instance.PerTipDocId:
                return value
        estudiantes = Estudiante.objects.filter(PerNumDoc=value)
        if estudiantes.exists():
            raise serializers.ValidationError('Ya existe un estudiante con este documento')
        return value

