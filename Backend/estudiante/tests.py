from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from estudiante.models.estudiante import Estudiante
from contrato.tests import ContratoTestCase

from usuario.tests import login_jwt

class EstudianteTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
    
    def test_crear_estudiante(self):
        """
        Caso de prueba: Crear estudiante
        Este test verifica que se pueda crear un estudiante utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se crea un estudiante
            3. Se verifica que se haya creado un estudiante
        """
        ContratoTestCase.crear_contrato(self)
        Estudiante.objects.all()
        self.assertEqual(Estudiante.objects.count(), 1)

    def test_ver_estudiantes(self):
        """
        Caso de prueba: Ver estudiantes
        Este test verifica que se puedan ver los estudiantes utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se crea un estudiante
            3. Se verifica que se obtengan dos estudiantes
        """
        ContratoTestCase.crear_contrato(self)
        url = '/api/estudiantes/'
        response = self.client.get(url)
        estudiante = Estudiante.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(estudiante.PerNumDoc, '12312323')
        self.assertEqual(estudiante.PerNom1, 'Juan')
        self.assertEqual(estudiante.PerNom2, 'Luis')
        self.assertEqual(estudiante.PerApePat, 'Chambi')
        self.assertEqual(estudiante.PerApeMat, 'Perez')
        self.assertEqual(estudiante.PerFecNac, '2007-03-01')
        self.assertEqual(estudiante.PerDir, 'Av. de prueba')
        self.assertEqual(estudiante.PerUbi, '040101')
        self.assertEqual(estudiante.NivCod.id, 1)
        self.assertEqual(estudiante.GraCod.id, 1)

    def test_actualizar_estudiantes(self):
        """
        Caso de prueba: Actualizar estudiante
        Este test verifica que se puedan actualizar los estudiantes utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se crea un estudiante
            3. Se verifica editan datos del estudiante
            4. Se verifica que se hayan dado los cambios 
        """
        estudiante_id = ContratoTestCase.crear_contrato(self)
        url = f'/api/estudiantes/{estudiante_id}/'
        data = {
            "tipo_documento": 1,
            "documento": "12312324",
            "primer_nombre": "Juan",
            "segundo_nombre": "Luis",
            "apellido_paterno": "Perez",
            "apellido_materno": "Chambi",
            "fecha_nacimiento": "2007-03-01",
            "direccion": "Av. de prueba",
            "ubigeo": "040101",
            "telefono": "982383821",
            "colegio_procedencia": "Colegio de prueba",
            "destreza": "Ninguna",
            "nivel_codigo": 2,
            "grado_codigo": 2
        }
        response = self.client.put(url, data, format='json')
        estudiante = Estudiante.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(estudiante.PerNumDoc, '12312324')
        self.assertEqual(estudiante.PerNom1, 'Juan')
        self.assertEqual(estudiante.PerNom2, 'Luis')
        self.assertEqual(estudiante.PerApePat, 'Perez')
        self.assertEqual(estudiante.PerApeMat, 'Chambi')
        self.assertEqual(estudiante.PerFecNac, '2007-03-01')
        self.assertEqual(estudiante.PerDir, 'Av. de prueba')
        self.assertEqual(estudiante.PerUbi, '040101')
        self.assertEqual(estudiante.EstColPro, "Colegio de prueba")
        self.assertEqual(estudiante.EstDes, 'Ninguna')
        self.assertEqual(estudiante.NivCod.id, 2)
        self.assertEqual(estudiante.GraCod.id, 2)
    
    def test_actualizar_estudiantes_parcial(self):
        """
        Caso de prueba: Actualizar estudiante parcial
        Este test verifica que se puedan actualizar los estudiantes parciales utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se crea un estudiante
            3. Se verifica editan datos del estudiante
            4. Se verifica que se hayan dado los cambios 
        """
        estudiante_id = ContratoTestCase.crear_contrato(self)
        url = f'/api/estudiantes/{estudiante_id}/'
        data = {
            "primer_nombre": "Edgar",
        }
        response = self.client.patch(url, data, format='json')
        estudiante = Estudiante.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(estudiante.PerNom1, 'Edgar')

    def test_eliminar_estudiantes(self):
        """
        Caso de prueba: Eliminar estudiante
        Este test verifica que se puedan eliminar los estudiantes utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se crea un estudiante
            3. Se elimina el estudiante
            4. Se verifica que se hayan dado los cambios
        """
        estudiante_id = ContratoTestCase.crear_contrato(self)
        url = f'/api/estudiantes/{estudiante_id}/'
        response = self.client.delete(url)
        estudiante = Estudiante.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(estudiante.count(), 0)

    def test_generar_password_estudiante(self):
        """
        Caso de prueba: Crear estudiante
        Este test verifica que se pueda crear un estudiante utilizando la API de estudiantes
        Pasos:
            1. Se crea un contrato
            2. Se obtiene el estudiante
            3. Se verifica que genere la contraseña
            4. se verifica que el detalle sea el mensaje de contraseña generada
            5. Se verifica que se haya generado la contraseña 
        """
        ContratoTestCase.crear_contrato(self)
        estudiante = Estudiante.objects.first()
        url = f'/api/estudiantes/generar-password/{estudiante.id}/'
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Contraseña generada correctamente')
        self.assertEqual(len(response.data['password']), 8)
