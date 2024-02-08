
from .parentesco import Parentesco
from rest_framework import serializers

class ComentarioSerializer(serializers.ModelSerializer):
    codigo_parentesco = serializers.PrimaryKeyRelatedField(source="ParCod", many=False, queryset=Parentesco.objects.all())
    comentario = serializers.CharField(source="ComCom")
    fecha = serializers.CharField(source="ComFec")

    class Meta:
        model = Parentesco
        fields = [
            'codigo_parentesco',
            'comentario',
            'fecha'
        ]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.id
        return representation