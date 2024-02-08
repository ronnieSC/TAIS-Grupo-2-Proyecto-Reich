from rest_framework import serializers
from usuario.models.rol import Rol

class RolSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source="RolNom")
    descripcion = serializers.CharField(source="RolDes")

    class Meta:
        model = Rol
        fields = ['nombre', 'descripcion']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation