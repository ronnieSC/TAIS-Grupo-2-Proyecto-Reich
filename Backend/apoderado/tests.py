from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from apoderado.models.apoderado import Apoderado
from apoderado.models.parentesco import Parentesco
from contrato.tests import ContratoTestCase

from usuario.tests import login_jwt

class ApoderadoTestCase(TransactionTestCase):
    reset_sequences = True

    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
    
    def crear_apoderado(testCase):
        url = '/api/apoderados/parentescos/'
        data = {
            'parentesco': 'Padre',
            'apoderado': { 
                "tipo_documento": 1, 
                "documento": "19293142",
                "primer_nombre": "Eduardo",
                "segundo_nombre": "Fernando",
                "apellido_paterno": "Merino",
                "apellido_materno": "Vilca",
                "fecha_nacimiento": "1992-01-02",
                "direccion": "Av. nogales",
                "ubigeo": "103003",
                "telefono": "732113811",
                "apoderado": True 
            },
            'contrato_codigo': 1
        }
        response = testCase.client.post(url, data, format='json')
        testCase.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data.get('id')
    
    def test_crear_apoderado(self):
        """
        Caso de prueba: Crear apoderado
        Este test verifica que se pueda crear un apoderado utilizando la API de parentescos
        Pasos:
            1. Se crea un contrato
            2. Se crea un apoderado
            3. Se verifica que se hayan creado dos apoderados (uno del contrato y el otro apoderado)
        """
        ContratoTestCase.crear_contrato(self)
        ApoderadoTestCase.crear_apoderado(self)
        apoderados = Apoderado.objects.all()
        self.assertEqual(apoderados.count(), 2)
    
    def test_ver_apoderados(self):
        """
        Caso de prueba: Ver apoderados
        Este test verifica que se puedan ver los apoderados utilizando la API de parentescos
        Pasos:
            1. Se crea un contrato
            2. Se crea un apoderado
            3. Se verifica que se obtengan dos apoderados
        """
        url = '/api/apoderados/parentescos/'
        ContratoTestCase.crear_contrato(self)
        ApoderadoTestCase.crear_apoderado(self)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_editar_apoderados(self):
        """
        Caso de prueba: Editar apoderados
        Este test verifica que se puedan editar los apoderados utilizando la API de parentescos
        Pasos:
            1. Se crea un contrato
            2. Se crea un apoderado
            3. Se verifica editan datos del apoderado
            4. Se verifica que se hayan dado los cambios 
        """
        ContratoTestCase.crear_contrato(self)
        apoderado_id = ApoderadoTestCase.crear_apoderado(self)
        url = f'/api/apoderados/parentescos/{apoderado_id}/'
        data = {
            'parentesco': 'Hermana',
            'apoderado': { 
                "tipo_documento": 1, 
                "documento": "13223342",
                "primer_nombre": "Fiorella",
                "apellido_paterno": "Chambi",
                "apellido_materno": "Luque",
                "fecha_nacimiento": "2002-05-08",
                "direccion": "Av. nogales",
                "ubigeo": "103003",
                "telefono": "932919811",
                "apoderado": False
            },
            'contrato_codigo': 1
        }
        self.client.put(url, data, format='json')
        parentesco = Parentesco.objects.get(id=apoderado_id)
        pariente = parentesco.ParApoId
        self.assertEqual(parentesco.ParPar, 'Hermana')
        self.assertEqual(pariente.PerNumDoc, '13223342')
        self.assertEqual(pariente.PerApePat, 'Chambi')
        self.assertEqual(pariente.PerApeMat, 'Luque')
        self.assertEqual(pariente.PerFecNac, '2002-05-08')
        self.assertEqual(pariente.PerUbi, '103003')
        self.assertEqual(pariente.PerDir, 'Av. nogales')
        self.assertEqual(pariente.PerTel, '932919811')
        self.assertEqual(pariente.ApoPri , False)
    
    def test_actualizar_apoderado_parcial(self):
        """
        Caso de prueba: Actualizar apoderado parcial
        Este test verifica que se puedan actualizar los apoderados parciales utilizando la API de parentescos
        Pasos:
            1. Se crea un contrato
            2. Se crea un apoderado
            3. Se verifica editan datos del apoderado
            4. Se verifica que se hayan dado los cambios 
        """
        ContratoTestCase.crear_contrato(self)
        parentesco_id = ApoderadoTestCase.crear_apoderado(self)
        url = f'/api/apoderados/parentescos/{parentesco_id}/'
        data = {
            'parentesco': 'Ninguno',
            'apoderado': { 
                "apoderado": False
            }
        }
        self.client.patch(url, data, format='json')
        apoderado = Parentesco.objects.get(id=parentesco_id)
        self.assertEqual(apoderado.ParPar, 'Ninguno')
        self.assertEqual(apoderado.ParApoId.ApoPri , False)

    def test_eliminar_apoderados(self):
        """
        Caso de prueba: Eliminar apoderados
        Este test verifica que se puedan eliminar los apoderados utilizando la API de parentescos
        Pasos:
            1. Se crea un contrato
            2. Se crea un apoderado
            3. Se elimina el apoderado
            4. Se verifica que se hayan dado los cambios
        """
        ContratoTestCase.crear_contrato(self)
        apoderado_id = ApoderadoTestCase.crear_apoderado(self)
        url = f'/api/apoderados/parentescos/{apoderado_id}/'
        response = self.client.delete(url)
        apoderados = Apoderado.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(apoderados.count(), 1)

    def test_generar_password_pariente(self):
        """
        Caso de prueba: Crear estudiante
        Este test verifica que se pueda generar una password para un pariente
        Pasos:
            1. Se crea un contrato
            2. Se obtiene el pariente
            3. Se verifica que genere la contraseña
            4. se verifica que el detalle sea el mensaje de contraseña generada
            5. Se verifica que se haya generado la contraseña 
        """
        ContratoTestCase.crear_contrato(self)
        pariente = Parentesco.objects.first()
        url = f'/api/apoderados/generar-password/{pariente.ParApoId.id}/'
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Contraseña generada correctamente')
        self.assertEqual(len(response.data['password']), 8)

ApoderadoTestCase.crear_apoderado = staticmethod(ApoderadoTestCase.crear_apoderado)
