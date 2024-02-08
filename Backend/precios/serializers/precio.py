from rest_framework import serializers

from precios.models.precio import Precio
from precios.models.razon import Razon

from fechaAcademica.models.ano_academico import AnoAcademico
from clase.models.nivel import Nivel

class PrecioSerializer(serializers.ModelSerializer):
    ano_codigo = serializers.PrimaryKeyRelatedField(
        many=False, 
        queryset=AnoAcademico.objects.all(),
        source="PreAnoAcaId"
    )
    nivel_codigo = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Nivel.objects.all(),
        source="PreNivId"
    )
    razon_codigo = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Razon.objects.all(),
        source="PreRazId"
    )
    monto = serializers.DecimalField(source="PreMon", max_digits=5, decimal_places=2)
 
    class Meta:
        model = Precio 
        fields = [
            'ano_codigo',
            'nivel_codigo',
            'razon_codigo',
            'monto',
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

