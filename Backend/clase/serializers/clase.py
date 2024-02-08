from rest_framework import serializers
from clase.models.clase import Clase

from clase.models.nivel import Nivel
from clase.models.grado import Grado

from clase.models.estudiante_clase import EstudianteClase
from docente.models.docente import Docente

class ClaseSerializer(serializers.ModelSerializer):
    nivel_codigo = serializers.PrimaryKeyRelatedField(
        source="ClaNivCod",
        many=False,
        queryset=Nivel.objects.all(),
    )
    grado_codigo = serializers.PrimaryKeyRelatedField(
        source="ClaGraCod",
        many=False,
        queryset=Grado.objects.all(),
    )
    tutor_codigo = serializers.PrimaryKeyRelatedField(
        source="ClaTutCod",
        many=False,
        queryset=Docente.objects.all(),
        required=False
    )
    clase = serializers.CharField(source="ClaNom")

    class Meta:
        model = Clase 
        fields = [
            'nivel_codigo',
            'grado_codigo',
            'tutor_codigo',
            'clase',
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        estudiantes = EstudianteClase.objects.filter(ClaCod=instance)
        representation['estudiantes'] = [
            {
                'id': estudiante.EstCod.pk,
                'primer_nombre': estudiante.EstCod.PerNom1,
                'segundo_nombre': estudiante.EstCod.PerNom2,
                'apellido_paterno': estudiante.EstCod.PerApePat,
                'apellido_materno': estudiante.EstCod.PerApeMat,
                'documento': estudiante.EstCod.PerNumDoc,
            } for estudiante in estudiantes]

        representation['id'] = instance.pk
        return representation


