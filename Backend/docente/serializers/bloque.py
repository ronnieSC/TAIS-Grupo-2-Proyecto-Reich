from rest_framework import serializers

from curso.models.curso import Curso

from docente.models.docente import Docente
from docente.models.horario import Horario
from docente.models.actividad import Actividad
from fechaAcademica.models.dia import Dia

from docente.models.bloque import Bloque

class BloqueSerializer(serializers.ModelSerializer):
    codigo_docente = serializers.PrimaryKeyRelatedField(
        source="DocCod",
        many=False,
        queryset=Docente.objects.all(),
        required=False
    )
    codigo_curso = serializers.PrimaryKeyRelatedField(
        source="CurCod",
        many=False,
        queryset=Curso.objects.all(),
        required=False
    )
    codigo_dia = serializers.PrimaryKeyRelatedField(
        source="DiaCod",
        many=False,
        queryset=Dia.objects.all(),
    )
    codigo_actividad = serializers.PrimaryKeyRelatedField(
        source="ActCod",
        many=False,
        queryset=Actividad.objects.all(),
    )
    codigo_horario = serializers.PrimaryKeyRelatedField(
        source="HorCod",
        many=False,
        queryset=Horario.objects.all(),
    )
    hora_inicio = serializers.CharField(source="BloHorIni")
    hora_fin = serializers.CharField(source="BloHorFin")

    class Meta:
        model = Bloque 
        fields = [
            'codigo_docente',
            'codigo_curso',
            'codigo_dia',
            'codigo_actividad',
            'codigo_horario',
            'hora_inicio',
            'hora_fin',
            ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation

# Serializers for horario view

class BloqueReadOnlySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    curso = serializers.CharField()
    actividad = serializers.CharField()
    hora_inicio = serializers.CharField()
    hora_fin = serializers.CharField()

class DiaReadOnlySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    dia = serializers.CharField()
    bloques = BloqueReadOnlySerializer(many=True)

class GradoReadOnlySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    grado = serializers.CharField()
    dias = DiaReadOnlySerializer(many=True)

class NivelReadOnlySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nivel = serializers.CharField()
    grados = GradoReadOnlySerializer(many=True)
