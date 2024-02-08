from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from clase.models.clase import Clase

from usuario.tests import login_jwt
from main.seeding import Seeding

class ClaseTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        Seeding.registrar_instancias()
        login_jwt(self.client)

    def crear_clase(self):
        url = '/api/clases/'
        data = {
            "nivel_codigo": 1,
            "grado_codigo": 1,
            "clase": "Clase 1",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data.get('id')

    def test_crear_clase(self):
        """
        Caso prueba: Crear clase
        Este test verifica que se pueda crear una clase utilizando la API de clases
        Pasos:
            1. Crear clase
            2. Verificar que la clase fue creada
            3. Verificar que los datos son correctos
                - Nivel
                - Grado
                - Docente
        """
        self.crear_clase()
        clase = Clase.objects.all()
        self.assertEqual(len(clase), 1, 'La clase no fue creada')
        
    def test_ver_clase(self):
        """
        Caso prueba: Ver clase
        Este test verifica que se pueda crear una clase utilizando la API de clases
        Pasos:
            1. Crear clase
            2. Verificar que la clase fue creada
            3. Verificar que los datos son correctos
                - Nivel
                - Grado
                - Docente
        """
        clase_id = self.crear_clase()
        url = f'/api/clases/{clase_id}/'
        response = self.client.get(url)
        clase = Clase.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(clase.id, clase_id)
        self.assertEqual(clase.ClaNivCod.NivNom, 'Primaria')
        self.assertEqual(clase.ClaGraCod.GraNum, '1')
        self.assertEqual(clase.ClaNom, 'Clase 1')

    def test_actualizar_clase(self):
        """
        Caso prueba: Actualizar clase
        Este test verifica que se pueda actualizar una clase utilizando la API de clases
        Pasos:
            1. Crear clase
            2. Actualizar la clase
            3. Verificar que la clase fue actualizada
            4. Verificar que los datos son correctos
                - Nivel
                - Grado
        """
        clase_id = self.crear_clase()
        url = f'/api/clases/{clase_id}/'
        data = {
            "nivel_codigo": 2,
            "grado_codigo": 2,
            "clase": "Clase 2",
        }
        response = self.client.put(url, data)
        clase = Clase.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(clase.id, clase_id)
        self.assertEqual(clase.ClaNivCod.NivNom, 'Secundaria')
        self.assertEqual(clase.ClaGraCod.GraNum, '2')
        self.assertEqual(clase.ClaNom, 'Clase 2')
    
    def test_actualizar_clase_parcial(self):
        """
        Caso prueba: Actualizar clase parcial
        Este test verifica que se pueda actualizar una clase utilizando la API de clases
        Pasos:
            1. Crear clase
            2. Actualizar la clase
            3. Verificar que la clase fue actualizada
            4. Verificar que los datos son correctos
                - Nivel
                - Grado
        """
        clase_id = self.crear_clase()
        url = f'/api/clases/{clase_id}/'
        data = {
            "grado_codigo": 2,
        }
        response = self.client.patch(url, data)
        clase = Clase.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(clase.ClaGraCod.GraNum, '2')
        self.assertEqual(clase.id, clase_id)

    def test_eliminar_clase(self):
        """
        Caso prueba: Eliminar clase
        Este test verifica que se pueda eliminar una clase utilizando la API de clases
        Pasos:
            1. Crear clase
            2. Eliminar la clase
            3. Verificar que la clase fue eliminada
        """
        clase_id = self.crear_clase()
        url = f'/api/clases/{clase_id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Clase.objects.count(), 0)
