from rest_framework import serializers
from clase.models.grado import Grado

class GradoSerializer(serializers.ModelSerializer):
    grado = serializers.CharField(source="GraNum")
    class Meta:
        model = Grado
        fields = ['grado']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['grado'] = instance.GraNum
        representation['id'] = instance.pk
        return representation

