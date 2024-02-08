from rest_framework import serializers
from clase.models.clase import Clase
from estudiante.models.estudiante import Estudiante
from fechaAcademica.models.semana import Semana
from clase.models.estudiante_clase import EstudianteClase

class EstudianteClaseSerializer(serializers.ModelSerializer):
    estudiante_codigo = serializers.PrimaryKeyRelatedField(
        source="EstCod",
        many=False,
        queryset=Estudiante.objects.all()
    )
    clase_codigo = serializers.PrimaryKeyRelatedField(
        source="ClaCod",
        many=False,
        queryset=Clase.objects.all()
    )
    semana_codigo = serializers.PrimaryKeyRelatedField(
        source="SemCod",
        many=False,
        queryset=Semana.objects.all(),
        required=False
    )

    class Meta:
        model = EstudianteClase 
        fields = [
            'estudiante_codigo',
            'clase_codigo',
            'semana_codigo',
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation


