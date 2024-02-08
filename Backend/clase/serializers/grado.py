from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from clase.models.grado import Grado

class GradoSerializer(serializers.ModelSerializer):
    grado = serializers.CharField(source="GraNum", validators=[
        UniqueValidator(queryset=Grado.objects.all(), message="El grado ya existe")
    ])
    class Meta:
        model = Grado
        fields = ['grado']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['grado'] = instance.GraNum
        representation['id'] = instance.pk
        return representation
    

