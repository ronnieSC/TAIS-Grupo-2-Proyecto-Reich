from django.db import transaction
from rest_framework import serializers
from apoderado.models.apoderado import Apoderado
from apoderado.models.parentesco import Parentesco

from usuario.models.usuario import Usuario

from clase.models.clase import Clase

from estudiante.serializers.estudiante import EstudianteSerializer
from apoderado.serializers.parentesco import ParentescoSerializer
from estudiante.models.estudiante import Estudiante 

from contrato.models.acuerdo_guia import AcuerdoGuia
from contrato.models.acuerdo_matricula import AcuerdoMatricula
from contrato.models.acuerdo_pension import AcuerdoPension 
from contrato.models.contrato import Contrato
from contrato.models.entrega_documento import EntregaDocumento

from contrato.serializers.acuerdo_guia import AcuerdoGuiaSerializer
from contrato.serializers.acuerdo_matricula import AcuerdoMatriculaSerializer
from contrato.serializers.acuerdo_pension import AcuerdoPensionSerializer
from contrato.serializers.entrega_documento import EntregaDocumentoSerializer
from responsable.models.responsable import Responsable

from rest_framework.response import Response
from rest_framework import status

class ContratoSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer(many=False, source='ConEstId')
    matricula = AcuerdoMatriculaSerializer(many=False, source="ConAcuMat")
    pension = AcuerdoPensionSerializer(many=False, source="ConAcuPen")
    guia = AcuerdoGuiaSerializer(many=False, source="ConAcuGui")
    condicion = serializers.CharField(source="ConConEst")
    firma_contrato = serializers.BooleanField(source="ConFir")
    responsable_informacion = serializers.PrimaryKeyRelatedField(
        source="ConResInf", 
        many=False,
        queryset=Responsable.objects.all()
    )
    parentescos = ParentescoSerializer(many=True, source="parentesco_set")
    documentos = EntregaDocumentoSerializer(many=True, source="entregadocumento_set")

    class Meta:
        model = Contrato
        read_only_fields = ('id',)
        fields = [
            'estudiante',
            'parentescos',
            'matricula',
            'pension',
            'guia',
            'condicion',
            'documentos',
            'firma_contrato',
            'responsable_informacion',
        ]

    def create(self, validated_data):
        try:
            with transaction.atomic():
                grado_data = validated_data.get('ConEstId').get('GraCod')
                nivel_data = validated_data.get('ConEstId').get('NivCod')
                estudiante_data = validated_data.pop('ConEstId')
                parentesco_data = validated_data.pop('parentesco_set')
                entregadocumento_data = validated_data.pop('entregadocumento_set')
                matricula_data = validated_data.pop('ConAcuMat')
                pension_data = validated_data.pop('ConAcuPen')
                guia_data = validated_data.pop('ConAcuGui')

                usuario_digitador = self.context['request'].user
                codigo_usuario_digitador = Usuario.objects.get(UseCod=usuario_digitador)

                # Registramos al estudiante
                estudiante = Estudiante.objects.create(**estudiante_data)

                # Registramos los acuerdos
                matricula = AcuerdoMatricula.objects.create(**matricula_data)
                pension = AcuerdoPension.objects.create(**pension_data)
                guia = AcuerdoGuia.objects.create(**guia_data)

                matricula.UsuCod.set([codigo_usuario_digitador])
                pension.UsuCod.set([codigo_usuario_digitador])
                guia.UsuCod.set([codigo_usuario_digitador])

                parentesco = []
                for pariente_data in parentesco_data:
                    apoderado_data = pariente_data.pop('ParApoId')
                    # Verificar si el apoderado existe en base a su documento
                    ya_existe = Apoderado.objects.filter(PerNumDoc=apoderado_data['PerNumDoc']).exists()
                    if ya_existe:
                        apoderado = Apoderado.objects.get(PerNumDoc=apoderado_data['PerNumDoc'])
                    else:
                        apoderado = Apoderado.objects.create(**apoderado_data)
                    parentesco += [Parentesco.objects.create(ParApoId=apoderado, **pariente_data)]

                documentos = []
                for entrega_documento_data in entregadocumento_data:
                    doc_id = entrega_documento_data.pop('DocId')
                    doc_entregado = entrega_documento_data.pop('EntDocEnt')
                    documentos += [EntregaDocumento.objects.create(DocId=doc_id, EntDocEnt = doc_entregado)]

                contrato = Contrato.objects.create(ConEstId=estudiante, ConAcuMat=matricula, ConAcuPen=pension, ConAcuGui=guia, ConFir = validated_data['ConFir'], ConResInf = validated_data['ConResInf'], ConConEst = validated_data['ConConEst'])

                #agregando la referencia al contrato en el parentesco
                for pariente in parentesco:
                    pariente.ParConId=contrato
                    pariente.save()

                #agregando la referencia al contrato en la entrega documento
                for documento in documentos:
                    documento.ConId = contrato 
                    documento.save()

                return contrato 

        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})
    
    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                estudiante_data = validated_data.pop('ConEstId', {})
                parentesco_data = validated_data.pop('parentesco_set', {})
                entregadocumento_data = validated_data.pop('entregadocumento_set', {})
                matricula_data = validated_data.pop('ConAcuMat', {})
                pension_data = validated_data.pop('ConAcuPen', {})
                guia_data = validated_data.pop('ConAcuGui', {})
                codigo_usuario_digitador = Usuario.objects.get(UseCod=self.context['request'].user)

                # Actualizando datos del estudiante 
                for key, value in estudiante_data.items():
                    setattr(instance.ConEstId, key, value)
                instance.ConEstId.save()

                # Actualizando acuerdo de Matricula
                for key, value in matricula_data.items():
                    setattr(instance.ConAcuMat, key, value)
                instance.ConAcuMat.UsuCod.add(codigo_usuario_digitador)
                instance.ConAcuMat.save()

                # Actualizando acuerdo de Pension
                for key, value in pension_data.items():
                    setattr(instance.ConAcuPen, key, value)
                instance.ConAcuPen.UsuCod.add(codigo_usuario_digitador)
                instance.ConAcuPen.save()

                # Actualizando acuerdo de Guia
                for key, value in guia_data.items():
                    setattr(instance.ConAcuGui, key, value)
                instance.ConAcuGui.UsuCod.add(codigo_usuario_digitador)
                instance.ConAcuGui.save()
                
                # Actualizacin de parientes y parentescos
                if parentesco_data and len(parentesco_data) > 0:
                    parientes = instance.parentesco_set.all()

                    # actualizacion de parientes actuales
                    for pariente in parientes:
                        # parentesco_data = [(<ParApoId>, <ParPar>), ...]
                        pariente_data = parentesco_data.pop(0)

                        apoderado_data = pariente_data.pop('ParApoId', None)
                        if not apoderado_data:
                            raise serializers.ValidationError('Error en el apoderado')

                        apoderado = pariente.ParApoId
                        # Actualizando la relacion (madre, padre, etc)
                        pariente.ParPar = pariente_data.pop('ParPar', pariente.ParPar)

                        # Actualizando informacion del apoderado
                        for key, value in apoderado_data.items():
                            setattr(apoderado, key, value)
                        apoderado.save()
                        pariente.save()
                    
                    # Si es que aun quedan instancias en parentescos se instancian nuevos modelos 
                    parentesco = []
                    for pariente_data in parentesco_data:
                        apoderado_data = pariente_data.pop('ParApoId')
                        apoderado = Apoderado.objects.create(**apoderado_data)
                        parentesco += [Parentesco.objects.create(
                            ParApoId=apoderado,
                            **pariente_data
                        )]

                    # Agregando la referencia al contrato en el parentesco (many-to-many)
                    for pariente in parentesco:
                        pariente.ParConId=instance
                        pariente.save()

                # Actualizacion de documentos 
                if entregadocumento_data:
                    documentos = instance.entregadocumento_set.all()

                    # actualizacion de documentos actuales
                    for documento_instance in documentos:
                        if len(entregadocumento_data) == 0:
                            break
                        entdoc_data = entregadocumento_data.pop(0)
                        documento_instance.DocId = entdoc_data.pop("DocId")
                        documento_instance.EntDocEnt = entdoc_data.pop("EntDocEnt")
                        documento_instance.save()

                    # Si es que aun quedan instancias en documentos se instancian nuevos modelos 
                    documentos_entregados = []
                    for entdoc_data in entregadocumento_data:
                        documentos_entregados+= [EntregaDocumento.objects.create(
                            **entdoc_data
                        )]

                    # Agregando la referencia al contrato en el documento_entrega(many-to-many)
                    for documento in documentos_entregados:
                        documento.ConId=instance
                        documento.save()

                # Actualizando datos del contrato
                for key, value in validated_data.items():
                    setattr(instance, key, value)
                instance.save()

                return instance 

        except Exception as e:
            raise serializers.ValidationError(e)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.pk
        parentescos_data = Parentesco.objects.filter(ParConId=instance.pk)
        representation['parentescos'] = []
        for pariente in parentescos_data:
            pariente_data = ParentescoSerializer(pariente).data
            pariente_data['apoderado']['id'] = pariente.ParApoId.pk
            representation['parentescos'] += [pariente_data]
        documentos = EntregaDocumento.objects.filter(ConId = instance.pk)
        representation['documentos'] = [{'id': ent_doc.DocId.pk, 'nombre_documento': ent_doc.DocId.DocTipDoc, 'entregado': ent_doc.EntDocEnt} for ent_doc in documentos]
        return representation 
        