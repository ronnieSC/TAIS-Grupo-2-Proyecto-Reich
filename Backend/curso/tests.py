from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from curso.models.curso import Curso

from usuario.tests import login_jwt

class CursoTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
        Curso.objects.all().delete()

    def crear_curso(self):
        url = '/api/cursos/'
        data = {"curso": "curso test"}
        response = self.client.post(url, data)
        return response.data.get('id')
    
    def test_crear_curso(self):
        """
        Caso de prueba: Crear curso
        Este test verifica que se pueda crear un nuevo curso utilizando la API de cursos
        Pasos:
            1. Se crea un nuevo curso
            2. Se verifica que el curso se haya creado
        """
        self.crear_curso()
        cursos = Curso.objects.all()
        self.assertEqual(cursos.first().CurNom, 'curso test')
        self.assertEqual(cursos.count(), 1)

    def test_ver_curso(self):
        """
        Caso de prueba: Ver curso
        Este test verifica que se pueda ver un nuevo curso utilizando la API de cursos
        Pasos:
            1. Se crea un nuevo curso
            2. Se verifica que el estado sea 200
            3. Se verifica la respuesta de la API
        """
        url = '/api/cursos/'
        self.crear_curso()
        response = self.client.get(url)
        curso = Curso.objects.get(CurNom='curso test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(curso.CurNom, 'curso test')

    def test_editar_curso(self):
        """
        Caso de prueba: Editar curso
        Este test verifica que se pueda editar un nuevo curso utilizando la API de cursos
        Pasos:
            1. Se crea un nuevo curso
            2. Se edita el curso
            3. Se verifica que el estado sea 200
            4. Se verifica que se hayan dado los cambios
        """
        curso_id = self.crear_curso()
        url = f'/api/cursos/{curso_id}/'
        data = {"curso": "Arte test"}
        response = self.client.put(url, data)
        curso = Curso.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(curso.CurNom, 'Arte test')

    def test_eliminar_curso(self):
        """
        Caso de prueba: Eliminar curso
        Este test verifica que se pueda eliminar un nuevo curso utilizando la API de cursos
        Pasos:
            1. Se crea un nuevo curso
            2. Se elimina el curso
            3. Se verifica que el estado sea 204
            4. Se verifica que el curso no exista
        """
        curso_id = self.crear_curso()
        url = f'/api/cursos/{curso_id}/'
        response = self.client.delete(url)
        cursos = Curso.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(cursos.count(), 0)
