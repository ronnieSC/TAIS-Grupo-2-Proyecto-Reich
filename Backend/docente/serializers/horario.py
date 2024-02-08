
from rest_framework import serializers 
from docente.models.horario import Horario
from clase.models.nivel import Nivel
from clase.models.grado import Grado
from rest_framework import status
from rest_framework.response import Response
from docente.serializers.bloque import BloqueSerializer

class HorarioSerializer(serializers.ModelSerializer):
    codigo_nivel = serializers.PrimaryKeyRelatedField(
        source="NivCod",
        many=False,
        queryset=Nivel.objects.all(),
    )
    codigo_grado = serializers.PrimaryKeyRelatedField(
        source="GraCod",
        many=False,
        queryset=Grado.objects.all(),
    )
    alarma = serializers.BooleanField(source="HorAla", required=False)

    class Meta:
        model = Horario
        fields = [
            'codigo_nivel',
            'codigo_grado',
            'alarma'
        ]
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Horario.objects.all(),
                fields=['codigo_nivel', 'codigo_grado'],
                message="Ya existe un horario para este nivel y grado"
            )
        ]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        representation['bloques'] = [bloque for bloque in BloqueSerializer(instance.bloque_set.all(), many=True).data]
        return representation

    def validate(self, data):
        attrs = super().validate(data)
        grado = attrs.get('GraCod')
        nivel = attrs.get('NivCod')
        if nivel.NivNom == "Secundaria" and grado.GraNum == "6":
            return Response(data={'error': 'Secundaria no tiene sexto grado'}, status=status.HTTP_400_BAD_REQUEST)
        return data