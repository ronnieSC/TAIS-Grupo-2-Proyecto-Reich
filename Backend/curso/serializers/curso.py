from rest_framework import serializers
from rest_framework import validators

from curso.models.curso import Curso

class CursoSerializer(serializers.ModelSerializer):
    curso = serializers.CharField(source="CurNom", validators=[
        validators.UniqueValidator(queryset=Curso.objects.all(), message="El curso ya existe")
    ])
    
    class Meta:
        model = Curso 
        fields = [
            'curso',
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation