from django.test import TransactionTestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models.precio import Precio
from .models.razon import Razon

from calificacion.tests import login_jwt

class PreciosTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
      
    def crear_precio(self):
        url = '/api/precios/'
        data = {
            'ano_codigo': 1,
            'nivel_codigo': 1,
            'razon_codigo': 1,
            'monto': 100
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data.get('id')

    def test_crear_precio(self):
        """
        Caso de prueba: Crear precio
        Este test verifica que se puedan crear precios utilizando la API
        Pasos:
            1. Se crea un precio
            2. Se verifica que se haya creado el precio
        """
        self.crear_precio()
        precios = Precio.objects.all()
        self.assertEqual(precios.count(), 1)

    def test_ver_precios(self):
        """
        Caso de prueba: Ver precios
        Este test verifica que se puedan ver los precios utilizando la API
        Pasos:
            1. Se crea un precio
            2. Se verifica que se obtengan dos precios
        """
        url = '/api/precios/'
        self.crear_precio()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_actualizar_precio(self):
        """
        Caso de prueba: Actualizar precio
        Este test verifica que se puedan actualizar los precios utilizando la API
        Pasos:
            1. Se crea un precio
            2. Se actualiza el precio
            3. Se verifica que se hayan dado los cambios
        """
        precio_id = self.crear_precio()
        url = f'/api/precios/{precio_id}/'
        data = {
            'ano_codigo': 1,
            'nivel_codigo': 2,
            'razon_codigo': 3,
            'monto': 200
        }
        response = self.client.put(url, data)
        precio = Precio.objects.get(id=precio_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(precio.PreMon, 200)
        self.assertEqual(precio.PreAnoAcaId.id , 1)
        self.assertEqual(precio.PreNivId.id, 2)
        self.assertEqual(precio.PreRazId.id, 3)
    
    def test_actualizar_precio_parcial(self):
        """
        Caso de prueba: Actualizar precio parcial
        Este test verifica que se puedan actualizar los precios utilizando la API
        Pasos:
            1. Se crea un precio
            2. Se actualiza el precio parcialmente
            3. Se verifica que se hayan dado los cambios
        """
        precio_id = self.crear_precio()
        url = f'/api/precios/{precio_id}/'
        data = {
            'nivel_codigo': 1
        }
        response = self.client.patch(url, data)
        precio = Precio.objects.get(id=precio_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(precio.PreNivId.id, 1)
    
    def test_eliminar_precio(self):
        """
        Caso de prueba: Eliminar precio
        Este test verifica que se puedan eliminar los precios utilizando la API
        Pasos:
            1. Se crea un precio
            2. Se elimina el precio
            3. Se verifica que no exista el precio
        """
        precio_id = self.crear_precio()
        url = f'/api/precios/{precio_id}/'
        response = self.client.delete(url)
        precios = Precio.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(precios.count(), 0)

class RazonesTestCase(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
        Razon.objects.all().delete()

    def crear_razon(self):
        url = '/api/precios/razon/'
        data = {
            'razon': 'Prueba'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data.get('id')

    def test_crear_razon(self):
        """
        Caso de prueba: Crear razon
        Este test verifica que se puedan crear razones utilizando la API
        Pasos:
            1. Se crea una razon
            2. Se verifica que se haya creado la razon
        """
        self.crear_razon()
        razones = Razon.objects.all()
        self.assertEqual(razones.count(), 1)

    def test_ver_razones(self):
        """
        Caso de prueba: Ver razones
        Este test verifica que se puedan ver las razones utilizando la API
        Pasos:
            1. Se crea una razon
            2. Se verifica que se obtengan dos razones
        """
        url = '/api/precios/razon/'
        self.crear_razon()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_actualizar_razon(self):
        """
        Caso de prueba: Actualizar razon
        Este test verifica que se puedan actualizar las razones utilizando la API
        Pasos:
            1. Se crea una razon
            2. Se actualiza la razon
            3. Se verifica que se hayan dado los cambios
        """
        razon_id = self.crear_razon()
        url = f'/api/precios/razon/{razon_id}/'
        data = {
            'razon': 'Prueba 2'
        }
        response = self.client.put(url, data)
        razon = Razon.objects.get(id=razon_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(razon.RazNom, 'Prueba 2')
    
    def test_eliminar_razon(self):
        """
        Caso de prueba: Eliminar razon
        Este test verifica que se puedan eliminar las razones utilizando la API
        Pasos:
            1. Se crea una razon
            2. Se elimina la razon
            3. Se verifica que no exista la razon
        """
        razon_id = self.crear_razon()
        url = f'/api/precios/razon/{razon_id}/'
        response = self.client.delete(url)
        razones = Razon.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(razones.count(), 0)