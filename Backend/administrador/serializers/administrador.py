from rest_framework import serializers
from usuario.serializers.usuario import UsuarioSerializer
from administrador.models.administrador import Administrador
from personas.models.tipo_documento import TipoDocumento

# Para gestionar accesos
class AdministradorSerializer(serializers.ModelSerializer):
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
    direccion = serializers.CharField(required=False, source="PerDir") # opcional
    ubigeo = serializers.CharField(required=False, source="PerUbi") # opcional
    fecha_nacimiento = serializers.CharField(source="PerFecNac")
    telefono = serializers.CharField(source="PerTel", required=False) #opcional

    class Meta:
        model = Administrador
        fields = [
            'usuario',
            'tipo_documento',
            'documento',
            'primer_nombre',
            'segundo_nombre', #opcional
            'apellido_materno',
            'apellido_paterno',
            'fecha_nacimiento',
            'direccion', # opcional
            'ubigeo', # opcional
            'telefono', # opcional
            ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
    
    def validate_documento(self, value):
        if self.instance and 'documento' in self.initial_data:
            if value == self.instance.PerTipDocId:
                return value
        administrador = Administrador.objects.filter(PerNumDoc=value)
        if administrador.exists():
            raise serializers.ValidationError('Ya existe un administrador con este documento')
        return value

