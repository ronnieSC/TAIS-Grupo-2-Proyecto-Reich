
from rest_framework import serializers
from django.contrib.auth.models import User

from usuario.models.usuario import Usuario
from usuario.serializers.rol import RolSerializer
from usuario.serializers.django_user import UserSerializer 

class UsuarioSerializer(serializers.ModelSerializer):
    rol = RolSerializer(source="RolCod")
    django_user = UserSerializer(
        source="UseCod",
        many=False
    )
    class Meta:
        model = Usuario
        fields = [
            'rol',
            'django_user'
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
