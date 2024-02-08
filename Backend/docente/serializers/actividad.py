
from rest_framework import serializers
from docente.models.actividad import Actividad

class ActividadSerializer(serializers.ModelSerializer):
    actividad = serializers.CharField(source="ActNom")

    class Meta:
        model = Actividad
        fields = ['actividad']
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
