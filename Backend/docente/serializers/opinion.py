from rest_framework import serializers

from docente.models.opinion import Opinion
from docente.models.docente import Docente

class OpinionSerializer(serializers.ModelSerializer):
    docente_codigo = serializers.PrimaryKeyRelatedField(
        queryset=Docente.objects.all(),
        source="DocCod",
        many=False
    )
    opinion = serializers.CharField(source="OpiOpi")

    class Meta:
        model = Opinion 
        fields = [
            'docente_codigo',
            'opinion',
            ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
