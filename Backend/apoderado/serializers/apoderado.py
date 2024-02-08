from rest_framework import serializers
from personas.models.tipo_documento import TipoDocumento
from apoderado.models.apoderado import Apoderado
from usuario.serializers.usuario import UsuarioSerializer
from rest_framework.response import Response
from rest_framework import status

class ApoderadoSerializer(serializers.ModelSerializer):
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
    primer_nombre = serializers.CharField(source="PerNom1")
    segundo_nombre = serializers.CharField(source="PerNom2", required=False) # opcional
    apellido_materno = serializers.CharField(source="PerApeMat")
    apellido_paterno = serializers.CharField(source="PerApePat")
    fecha_nacimiento = serializers.CharField(source="PerFecNac")
    direccion = serializers.CharField(source="PerDir")
    # apoderado
    telefono = serializers.CharField(source="PerTel")
    nivel_estudios = serializers.CharField(source="ApoNivEst", required=False) # opcional
    centro_trabajo = serializers.CharField(source="ApoCenTra", required=False) # opcional
    apoderado = serializers.BooleanField(source="ApoPri", required=False) #opcional

    # Campos nuevos sprint 11
    ubigeo = serializers.CharField(source="PerUbi", required=False)
    
    class Meta:
        model = Apoderado 
        fields = [
            'usuario',
            'tipo_documento',
            'documento',
            'primer_nombre',
            'segundo_nombre',
            'apellido_materno',
            'apellido_paterno',
            'fecha_nacimiento',
            'direccion', 
            'telefono',
            'ubigeo',
            'nivel_estudios',
            'centro_trabajo',
            'apoderado',
        ]
        # read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
    
    def validate_documento(self, value):
        if self.instance and 'documento' in self.initial_data:
            if value == self.instance.PerTipDocId:
                return value
        apoderados = Apoderado.objects.filter(PerNumDoc=value)
        if apoderados.exists():
            raise serializers.ValidationError('Ya existe un apoderado con este documento')
        return value
