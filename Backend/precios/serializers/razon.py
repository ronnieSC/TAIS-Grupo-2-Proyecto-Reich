
from precios.models.razon import Razon
from rest_framework import serializers

class RazonSerializer(serializers.ModelSerializer):
    razon = serializers.CharField(source="RazNom")
    
    class Meta:
        model = Razon
        fields = [
            'razon'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
