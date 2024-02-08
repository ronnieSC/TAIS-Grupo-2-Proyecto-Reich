
from rest_framework import serializers
from responsable.models.responsable import Responsable

class ResponsableSerializer(serializers.ModelSerializer):
    primer_nombre = serializers.CharField(source="ResNom1")
    segundo_nombre = serializers.CharField(source="ResNom2", allow_blank=True, allow_null=True, required=False)
    apellido_paterno = serializers.CharField(source="ResApePat")
    apellido_materno = serializers.CharField(source="ResApeMat")
    class Meta:
        model = Responsable
        fields = [
            'primer_nombre',
            'segundo_nombre',
            'apellido_paterno',
            'apellido_materno'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
