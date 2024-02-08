from rest_framework import serializers
from clase.models.nivel import Nivel

class NivelSerializer(serializers.ModelSerializer):
    nivel = serializers.CharField(source="NivNom")
    class Meta:
        model = Nivel
        fields = ['nivel'] 
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['nivel'] = instance.NivNom
        representation['id'] = instance.pk
        return representation

