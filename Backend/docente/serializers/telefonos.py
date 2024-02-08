
from docente.models.telefonos import Telefono

from rest_framework import serializers

class TelefonoSerializer(serializers.ModelSerializer):
    telefono = serializers.CharField(source="TelNum")

    class Meta:
        model = Telefono
        fields = [
            'telefono',
        ]
        read_only_fields = ['id']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
