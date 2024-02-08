from rest_framework import serializers        
from contrato.models.entrega_documento import EntregaDocumento
from contrato.models.documento import Documento

# API de solo lectura
class EntregaDocumentoSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(
        many=False,
        source="DocId",
        queryset=Documento.objects.all(),
    )
    entregado = serializers.BooleanField(source='EntDocEnt')

    class Meta:
        model = EntregaDocumento
        fields = [
            'id',
            'entregado'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

