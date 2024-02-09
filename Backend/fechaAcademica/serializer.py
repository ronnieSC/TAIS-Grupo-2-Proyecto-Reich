from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from fechaAcademica.models.semana import Semana
from fechaAcademica.models.bimestre import Bimestre
from fechaAcademica.models.ano_academico import AnoAcademico
from fechaAcademica.models.fecha_academica import FechaAcademica
from fechaAcademica.models.dia import Dia 

class SemanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semana
        fields = '__all__'

class BimestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bimestre 
        fields = '__all__'

class AnoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnoAcademico
        fields = '__all__'

    def validate(self, data):
        anio = data.get('AnoAcaNum', None)
        if not anio:
            raise serializers.ValidationError("No ha brindado un valor para el campo 'AnoAcaNum'.")
        if AnoAcademico.objects.filter(AnoAcaNum=anio).exists():
            raise serializers.ValidationError("El valor dado ya existe.")
        return data

class FechaAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FechaAcademica
        fields = '__all__'

class DiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dia 
        fields = '__all__'
       