from rest_framework import serializers
from contrato.models.documento import Documento

class DocumentoSerializer(serializers.ModelSerializer):
    tipo_documento = serializers.CharField(source="DocTipDoc")

    class Meta:
        model = Documento
        fields = [
            'tipo_documento',
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
        