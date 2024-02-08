from rest_framework import serializers
from apoderado.serializers.apoderado import ApoderadoSerializer
from apoderado.models.parentesco import Parentesco
from contrato.models.contrato import Contrato
from django.db import transaction
from apoderado.models.apoderado import Apoderado

from rest_framework import status
from rest_framework.response import Response

class ParentescoSerializer(serializers.ModelSerializer):
    parentesco = serializers.CharField(source="ParPar")
    apoderado = ApoderadoSerializer(many=False, source='ParApoId')
    contrato_codigo = serializers.PrimaryKeyRelatedField(
        many=False, 
        queryset=Contrato.objects.all(),
        source='ParConId',
        required=False,
    )
    class Meta:
        model = Parentesco
        fields = [
            'parentesco',
            'apoderado',
            'contrato_codigo'
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

    def create(self, validated_data):
        try:
            with transaction.atomic():
                apoderado_data = validated_data.pop('ParApoId')
                apoderado_instance = Apoderado.objects.create(**apoderado_data)
                parentesco_instance = Parentesco.objects.create(**validated_data, ParApoId=apoderado_instance)
                return parentesco_instance 

        except Exception as err:
            return Response(data={'error': str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                apoderado_data = validated_data.pop('ParApoId')
                apoderado_instance = instance.ParApoId 

                # Actualizando el apoderado
                apoderado_instance.PerTipDocId = apoderado_data.pop('PerTipDocId', apoderado_instance.PerTipDocId)
                apoderado_instance.PerNumDoc = apoderado_data.pop('PerNumDoc', apoderado_instance.PerNumDoc)
                apoderado_instance.PerNom1 = apoderado_data.pop('PerNom1', apoderado_instance.PerNom1)
                apoderado_instance.PerNom2 = apoderado_data.pop('PerNom2', apoderado_instance.PerNom2)
                apoderado_instance.PerApeMat = apoderado_data.pop('PerApeMat', apoderado_instance.PerApeMat)
                apoderado_instance.PerApePat = apoderado_data.pop('PerApePat', apoderado_instance.PerApePat)
                apoderado_instance.PerDir = apoderado_data.pop('PerDir', apoderado_instance.PerDir)
                apoderado_instance.PerFecNac = apoderado_data.pop('PerFecNac', apoderado_instance.PerFecNac)
                apoderado_instance.PerTel = apoderado_data.pop('PerTel', apoderado_instance.PerTel)
                apoderado_instance.ApoNivEst = apoderado_data.pop('ApoNivEst', apoderado_instance.ApoNivEst)
                apoderado_instance.ApoCenTra = apoderado_data.pop('ApoCenTra', apoderado_instance.ApoCenTra)
                apoderado_instance.ApoPri = apoderado_data.pop('ApoPri', apoderado_instance.ApoPri)
                apoderado_instance.save()

                # Actualizando el parentesco
                instance.ParPar = validated_data.pop('ParPar', instance.ParPar)
                instance.ParConId = validated_data.pop('ParConId', instance.ParConId)
                instance.save()

                return instance

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)