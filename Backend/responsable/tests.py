from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models.responsable import Responsable

from usuario.tests import login_jwt

class ResponsableTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)

    def crear_responsable(self):
        url = '/api/responsables/'
        data = {
            'primer_nombre': 'Lucio',
            'segundo_nombre': 'Edgar',
            'apellido_paterno': 'Villa',
            'apellido_materno': 'Nueva'
        }
        request = self.client.post(url, data, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        return request.data['id']

    def test_crear_responsable(self):
        """
        Caso prueba: Crear responsable
        Este test verifica que se pueda crear un responsable utilizando la API de responsables
        Pasos:
            1. Crear responsable
            2. Verificar que el responsable fue creado
        """
        self.crear_responsable()
        responsable = Responsable.objects.all()
        self.assertEqual(len(responsable), 4)
    
    def test_ver_responsables(self):
        """
        Caso de prueba: Ver responsables
        Este test verifica que se puedan ver los responsables utilizando la API de responsables
        Pasos:
            1. Se crea un responsable
            2. Se verifica que se obtengan dos responsables
        """
        url = '/api/responsables/'
        responsable_id = self.crear_responsable()
        response = self.client.get(url)
        responsable = Responsable.objects.get(id=responsable_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responsable.ResNom1, 'Lucio')
        self.assertEqual(responsable.ResNom2, 'Edgar')
        self.assertEqual(responsable.ResApePat, 'Villa')
        self.assertEqual(responsable.ResApeMat, 'Nueva')

    def test_actualizar_responsable(self):
        """
        Caso de prueba: Actualizar responsable
        Este test verifica que se pueda ver un responsable utilizando la API de responsables
        Pasos:
            1. Se crea un responsable
            2. Se actualizan los datos del responsable
            3. Se verifica que los datos se hayan actualizado
        """
        responsable_id = self.crear_responsable()
        url = f'/api/responsables/{responsable_id}/'
        data = {
            'primer_nombre': 'Eduardo',
            'segundo_nombre': 'Salazar',
            'apellido_paterno': 'Bravo',
            'apellido_materno': 'Puebla',
        }
        response = self.client.put(url, data, format='json')
        responsable = Responsable.objects.get(id=responsable_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responsable.ResNom1, 'Eduardo')
        self.assertEqual(responsable.ResNom2, 'Salazar')
        self.assertEqual(responsable.ResApePat, 'Bravo')
        self.assertEqual(responsable.ResApeMat, 'Puebla')
    
    def test_actualizar_responsable_parcial(self):
        """
        Caso de prueba: Ver responsable
        Este test verifica que se pueda ver un responsable utilizando la API de responsables
        Pasos:
            1. Se crea un responsable
            2. Se actualizan los datos parciales del responsable
            3. Se verifica que los datos se hayan actualizado
        """
        responsable_id = self.crear_responsable()
        url = f'/api/responsables/{responsable_id}/'
        data = {
            'primer_nombre': 'Eduardo',
        }
        response = self.client.patch(url, data, format='json')
        responsable = Responsable.objects.get(id=responsable_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(responsable.ResNom1, 'Eduardo')
        self.assertEqual(responsable.ResNom2, 'Edgar')
        self.assertEqual(responsable.ResApePat, 'Villa')
        self.assertEqual(responsable.ResApeMat, 'Nueva')
    
    def test_eliminar_responsable(self):
        """
        Caso de prueba: Eliminar responsable
        Este test verifica que se pueda eliminar un responsable utilizando la API de responsables
        Pasos:
            1. Se crea un responsable
            2. Se elimina el responsable
            3. Se verifica que el responsable fue eliminado
        """
        responsable_id = self.crear_responsable()
        url = f'/api/responsables/{responsable_id}/'
        response = self.client.delete(url)
        responsable = Responsable.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(responsable), 3)



