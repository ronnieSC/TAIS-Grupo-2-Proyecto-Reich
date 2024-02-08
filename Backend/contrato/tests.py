from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from contrato.models.contrato import Contrato
from responsable.models.responsable import Responsable

from usuario.tests import login_jwt
from main.seeding import Seeding

class ContratoTestCase(TransactionTestCase):
    reset_sequences = True

    def setUp(self):
        self.client = APIClient()
        Seeding.registrar_instancias()
        login_jwt(self.client)

    def crear_responsable(testCase):
        url = '/api/responsables/'
        data = {
            "primer_nombre": "Thor",
            "segundo_nombre": "Brando",
            "apellido_materno": "Yañez",
            "apellido_paterno": "Escobar",
        }
        response = testCase.client.post(url, data, format='json')
        testCase.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data['id']

    def crear_contrato(testCase):
        url = '/api/contratos/'
        data = {
            "estudiante": { "tipo_documento": 1, "documento": "12312323", "primer_nombre": "Juan", "segundo_nombre": "Luis", "apellido_materno": "Perez", "apellido_paterno": "Chambi", "fecha_nacimiento": "2007-03-01", "colegio_procedencia": "Colegio Santa Catalina", "destreza": "Ninguna", "direccion": "Av. de prueba", "ubigeo": "040101", "grado_codigo": 1, "nivel_codigo": 1 },
            "parentescos": [{ "parentesco":"Madre", "apoderado": { "tipo_documento": 1, "documento": "89898989", "primer_nombre": "Maria", "segundo_nombre": "Luz", "apellido_paterno": "Vega", "apellido_materno": "Ramirez", "fecha_nacimiento": "2007-03-01", "direccion": "Av. de prueba", "ubigeo": "123123", "telefono": "982383821", "apoderado": True }} ],
            "matricula": { "descuento": 30, "monto_pactado": 280, "responsable": 1},
            "pension": { "descuento": 10, "monto_pactado": 310, "responsable": 1, "fecha_pagos": "32-42-1092" },
            "guia": { "descuento": 20, "monto_pactado": 80, "responsable": 1},
            "documentos":[],
            "condicion": "Nuevo",
            "firma_contrato": False,
            "responsable_informacion": 1 
            }
        response = testCase.client.post(url, data, format='json')
        testCase.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data['id']

    def test_crear_contrato(self):
        """
        Caso prueba: Crear contrato
        Este test verifica que se puede crear contrato utilizando la API de contratos
        Pasos:
            1. Crear contrato
            2. Verificar que el contrato fue creado
            2. Verificar que los datos son correctos
                - Estudiante
                - Parentescos
                - Matricula
                - Pension
                - Guia
                - Datos del contrato
        """
        ContratoTestCase.crear_contrato(self)
        contratos = Contrato.objects.all()
        self.assertEqual(len(contratos), 1, 'El contrato no fue creado')

        # Verificar los datos del estudiante
        estudiante = contratos[0].ConEstId
        parentesco = contratos[0].ConParId.first().parentesco_set.first().ParPar
        apoderado = contratos[0].ConParId.all()[0]
        responsable = Responsable.objects.first()
        self.assertEqual(estudiante.PerNom1, 'Juan')
        self.assertEqual(estudiante.PerNom2, 'Luis')
        self.assertEqual(estudiante.PerApePat, 'Chambi')
        self.assertEqual(estudiante.PerApeMat, 'Perez')
        self.assertEqual(estudiante.PerNumDoc, '12312323')
        self.assertEqual(estudiante.PerFecNac, '2007-03-01')
        self.assertEqual(estudiante.PerUbi, '040101')
        self.assertEqual(estudiante.PerDir, 'Av. de prueba')

        # Verificar parentesco
        self.assertEqual(parentesco, 'Madre')

        # Verificar apoderado
        self.assertEqual(apoderado.PerNom1, 'Maria')
        self.assertEqual(apoderado.PerNom2, 'Luz')
        self.assertEqual(apoderado.PerApePat, 'Vega')
        self.assertEqual(apoderado.PerApeMat, 'Ramirez')
        self.assertEqual(apoderado.PerNumDoc, '89898989')
        self.assertEqual(apoderado.PerFecNac, '2007-03-01')
        self.assertEqual(apoderado.PerUbi, '123123')
        self.assertEqual(apoderado.PerDir, 'Av. de prueba')

        # Verificar matricula
        matricula = contratos[0].ConAcuMat
        self.assertEqual(matricula.AcuDes, 30)
        self.assertEqual(matricula.AcuMonPac, 280)
        self.assertEqual(matricula.AcuResPac.id, responsable.id)

        # Verificar pension
        pension = contratos[0].ConAcuPen
        self.assertEqual(pension.AcuDes, 10)
        self.assertEqual(pension.AcuMonPac, 310)
        self.assertEqual(pension.AcuResPac.id, responsable.id)

        # Verificar guia
        guia = contratos[0].ConAcuGui
        self.assertEqual(guia.AcuDes, 20)
        self.assertEqual(guia.AcuMonPac, 80)
        self.assertEqual(guia.AcuResPac.id, responsable.id)

        # Verificar condicion
        self.assertEqual(contratos[0].ConConEst, 'Nuevo')

        # Verificar firma_contrato
        self.assertEqual(contratos[0].ConFir, False)

        # Verificar responsable_informacion
        self.assertEqual(contratos[0].ConResInf.id, responsable.id)

    def test_ver_contrato(self):
        """
        Caso prueba: Ver contrato
        Este test verifica que se puede ver el contrato utilizando la API de contratos
        Pasos:
            1. Crear contrato
            2. Consultar el contrato con la API
            2. Verificar que el estado sea 200
            3. Verificar que se puede ver el contrato
        """
        url = '/api/contratos/'
        ContratoTestCase.crear_contrato(self)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_actualizar_contrato(self):
        """
        Caso prueba: Actualizar contrato
        Este test verifica que se puede actualizar el contrato utilizando la API de contratos
        Pasos:
            1. Crear contrato
            2. Modificar el contrato
            3. Verificar que el estado sea 200
            4. Verificar que los del contrato se actualizan
                - Estudiante
                - Parentescos
                - Matricula
                - Pension
                - Guia
                - Datos del contrato
        """
        contrato_id = ContratoTestCase.crear_contrato(self)
        responsable = Responsable.objects.first()
        url = f'/api/contratos/{contrato_id}/'
        data = {
            "estudiante": { "tipo_documento": 1, "documento": "33312323", "primer_nombre": "Lucas", "segundo_nombre": "Bellido", "apellido_materno": "Barragan", "apellido_paterno": "Merino", "fecha_nacimiento": "2005-02-02", "colegio_procedencia": "Colegio Vera Cruz", "destreza": "Artes", "direccion": "Av. Nogales", "ubigeo": "040201", "grado_codigo": 1, "nivel_codigo": 1 },
            "parentescos": [{ "parentesco":"Padre", "apoderado": { "tipo_documento": 1, "documento": "79893122", "primer_nombre": "Eduardo", "segundo_nombre": "Fernando", "apellido_paterno": "Merino", "apellido_materno": "Vilca", "fecha_nacimiento": "1992-01-02", "direccion": "Av. nogales", "ubigeo": "103003", "telefono": "732113811", "apoderado": True }} ],
            "matricula": { "descuento": 40, "monto_pactado": 280, "responsable": responsable.id },
            "pension": { "descuento": 40, "monto_pactado": 310, "responsable": responsable.id, "fecha_pagos": "32-42-1092" },
            "guia": { "descuento": 40, "monto_pactado": 80, "responsable": responsable.id },
            "documentos":[],
            "condicion": "Egresado",
            "firma_contrato": False,
            "responsable_informacion": responsable.id
        }
        response = self.client.put(url, data, format='json')
        contrato = Contrato.objects.get(id=contrato_id)
        estudiante = contrato.ConEstId
        parentesco = contrato.ConParId.first().parentesco_set.first().ParPar
        apoderado = contrato.ConParId.all()[0]

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(estudiante.PerNom1, 'Lucas')
        self.assertEqual(estudiante.PerNom2, 'Bellido')
        self.assertEqual(estudiante.PerApePat, 'Merino')
        self.assertEqual(estudiante.PerApeMat, 'Barragan')
        self.assertEqual(estudiante.PerNumDoc, '33312323')
        self.assertEqual(estudiante.PerFecNac, '2005-02-02')
        self.assertEqual(estudiante.PerUbi, '040201')
        self.assertEqual(estudiante.PerDir, 'Av. Nogales')

        # Verificar parentesco
        self.assertEqual(parentesco, 'Padre')

        # Verificar apoderado
        self.assertEqual(apoderado.PerNom1, 'Eduardo')
        self.assertEqual(apoderado.PerNom2, 'Fernando')
        self.assertEqual(apoderado.PerApePat, 'Merino')
        self.assertEqual(apoderado.PerApeMat, 'Vilca')
        self.assertEqual(apoderado.PerNumDoc, '79893122')
        self.assertEqual(apoderado.PerFecNac, '1992-01-02')
        self.assertEqual(apoderado.PerUbi, '103003')
        self.assertEqual(apoderado.PerDir, 'Av. nogales')

        # Verificar matricula
        matricula = contrato.ConAcuMat
        self.assertEqual(matricula.AcuDes, 40)
        self.assertEqual(matricula.AcuMonPac, 280)
        self.assertEqual(matricula.AcuResPac.id, responsable.id)

        # Verificar pension
        pension = contrato.ConAcuPen
        self.assertEqual(pension.AcuDes, 40)
        self.assertEqual(pension.AcuMonPac, 310)
        self.assertEqual(pension.AcuResPac.id, responsable.id)

        # Verificar guia
        guia = contrato.ConAcuGui
        self.assertEqual(guia.AcuDes, 40)
        self.assertEqual(guia.AcuMonPac, 80)
        self.assertEqual(guia.AcuResPac.id, responsable.id)

        # Verificar condicion
        self.assertEqual(contrato.ConConEst, 'Egresado')

        # Verificar firma_contrato
        self.assertEqual(contrato.ConFir, False)

        # Verificar responsable_informacion
        self.assertEqual(contrato.ConResInf.id, responsable.id)
    
    def test_actualizar_contrato_parcial(self):
        """
        Caso de prueba: Actualizar contrato parcial
        Este test verifica que se puede actualizar un contrato parcial utilizando la API de contratos
        Pasos:
            1. Crear contrato
            2. Actualizar el contrato parcial
            3. Verificar que el estado sea 200
            4. Verificar que el campo "primer_nombre" del estudiante sea "Lucas"
        """
        contrato_id = ContratoTestCase.crear_contrato(self)
        url = f'/api/contratos/{contrato_id}/'
        data = {
            "estudiante": {
                "primer_nombre": 'Rafael',
            },
            "condicion": "Egresado",
            "parentescos": [
                {
                    "parentesco": "Madre",
                    "apoderado": {
                        "primer_nombre": "Luisa",
                        "apellido_materno": "Gonzalez",
                    }
                }
            ],
        }
        response = self.client.patch(url, data, format='json')
        contrato = Contrato.objects.get(id=contrato_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(contrato.ConEstId.PerNom1, 'Rafael')
        self.assertEqual(contrato.ConConEst, 'Egresado')

        parentesco = contrato.ConParId.first().parentesco_set.first().ParPar
        apoderado = contrato.ConParId.all()[0]
        # Verificar parentesco
        self.assertEqual(parentesco, 'Madre')

        # Verificar apoderado
        self.assertEqual(apoderado.PerNom1, 'Luisa')
        self.assertEqual(apoderado.PerApeMat, 'Gonzalez')
    
    def test_eliminar_contrato(self):
        """
        Caso de prueba: Eliminar contrato
        Este test verifica que se puede eliminar un contrato utilizando la API de contratos
        Pasos:
            1. Crear contrato
            2. Eliminar el contrato
            3. Verificar que el estado sea 200
            4. Verificar que no exista ningun contrato
        """
        contrato_id = ContratoTestCase.crear_contrato(self)
        url = f'/api/contratos/{contrato_id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Contrato.objects.count(), 0)
    
ContratoTestCase.crear_contrato = staticmethod(ContratoTestCase.crear_contrato)
ContratoTestCase.crear_responsable = staticmethod(ContratoTestCase.crear_responsable)