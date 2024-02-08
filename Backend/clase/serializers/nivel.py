from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from clase.models.nivel import Nivel

class NivelSerializer(serializers.ModelSerializer):
    nivel = serializers.CharField(source="NivNom", validators=[
        UniqueValidator(queryset=Nivel.objects.all(), message="El nivel ya existe")
    ])
    class Meta:
        model = Nivel
        fields = ['nivel'] 
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['nivel'] = instance.NivNom
        representation['id'] = instance.pk
        return representation

