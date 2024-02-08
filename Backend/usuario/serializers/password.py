
from rest_framework import serializers

class PasswordSerializer(serializers.Serializer):
    antigua_password = serializers.CharField(
        required=True
    )
    nueva_password1 = serializers.CharField(
        required=True
    )
    nueva_password2 = serializers.CharField(
        required=True
    )
    