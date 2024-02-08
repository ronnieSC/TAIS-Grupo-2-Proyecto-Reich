
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.CharField(source="username")
    ultima_sesion = serializers.CharField(source="last_login")
    fecha_registro = serializers.CharField(source="date_joined")

    class Meta:
        model = User 
        fields = [
            'nombre_usuario',
            'ultima_sesion',
            'fecha_registro'
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

