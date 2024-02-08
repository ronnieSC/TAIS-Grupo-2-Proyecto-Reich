
from rest_framework import serializers
from calificacion.models.calificacion import Calificacion
from estudiante.models.estudiante import Estudiante
from docente.models.docente import Docente
from curso.models.curso import Curso

class CalificacionSerializer(serializers.ModelSerializer):
    codigo_estudiante = serializers.PrimaryKeyRelatedField(
        source="EstCod",
        many=False,
        queryset=Estudiante.objects.all(),
    )
    codigo_curso = serializers.PrimaryKeyRelatedField(
        source="CurCod",
        many=False,
        queryset=Curso.objects.all(),
    )
    codigo_docente = serializers.PrimaryKeyRelatedField(
        source="DocCod",
        many=False,
        queryset=Docente.objects.all(),
        required=False
    )
    nota_participacion = serializers.FloatField(source="CalPar", required=False, allow_null=True, default=0)
    nota_tarea = serializers.FloatField(source="CalTar", required=False, allow_null=True, default=0)
    nota_examen = serializers.FloatField(source="CalExa", required=False, allow_null=True, default=0)

    fecha = serializers.CharField(source="CalFec")

    class Meta:
        model = Calificacion
        fields = [
            'codigo_estudiante',
            'codigo_curso',
            'codigo_docente',
            'nota_participacion',
            'nota_tarea',
            'nota_examen',
            'fecha',
        ]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        return representation
        
    