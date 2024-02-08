from rest_framework import serializers
from usuario.models.usuario import Usuario
from contrato.models.acuerdo_pension import AcuerdoPension
from responsable.models.responsable import Responsable

class AcuerdoPensionSerializer(serializers.ModelSerializer):
    # fecha de pagos unico del acuerdo de pension
    fecha_pagos = serializers.CharField(source='AcuPenFecPag')
    descuento = serializers.DecimalField(source="AcuDes", max_digits=5, decimal_places=2)
    monto_pactado = serializers.DecimalField(source="AcuMonPac", max_digits=5, decimal_places=2)
    responsable = serializers.PrimaryKeyRelatedField(
        source="AcuResPac",
        many=False,
        queryset=Responsable.objects.all()
    )
    digitador = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True, 
        queryset=Usuario.objects.all(),
        source="UsuCod"
    )

    class Meta:
        model = AcuerdoPension
        fields = [
            'descuento',
            'monto_pactado',
            'responsable',
            'digitador',
            'fecha_pagos'
        ]
        read_only_fields = ['id']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['digitador'] = [{'id': item.id, 'usuario': item.UseCod.username} for item in instance.UsuCod.all()]
        representation['id'] = instance.pk
        return representation
