from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from calificacion.models.calificacion import Calificacion
from docente.tests import DocenteTestCase
from contrato.tests import ContratoTestCase

from usuario.tests import login_jwt

class CalificacionTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
        ContratoTestCase.crear_contrato(self)
        DocenteTestCase.crear_docentes(self)

    def crear_calificacion(testCase):
        url = '/api/calificaciones/'
        data = {
            'codigo_estudiante': 1,
            'codigo_curso': 1,
            'codigo_docente': 1,
            'nota_participacion': 10,
            'nota_tarea': 10,
            'nota_examen': 10,
            'fecha': '2022-01-01',
        }
        response = testCase.client.post(url, data)
        testCase.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response.data.get('id')

    def test_crear_calificacion(self):
        CalificacionTestCase.crear_calificacion(self)
        calificaciones = Calificacion.objects.all()
        calificacion = calificaciones.first()
        self.assertEqual(calificaciones.count(), 1)
        self.assertEqual(calificacion.CalPar, 10)
        self.assertEqual(calificacion.CalTar, 10)
        self.assertEqual(calificacion.CalExa, 10)
        self.assertEqual(calificacion.CalFec, '2022-01-01')

    def test_ver_calificacion(self):
        calificacion_id = CalificacionTestCase.crear_calificacion(self)
        url = f'/api/calificaciones/{calificacion_id}/'
        response = self.client.get(url)
        calificacion = Calificacion.objects.first()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(calificacion.CalPar, 10)
        self.assertEqual(calificacion.CalTar, 10)
        self.assertEqual(calificacion.CalExa, 10)
        self.assertEqual(calificacion.CalFec, '2022-01-01')
    
    def test_actualizar_calificacion(self):
        calificacion_id = CalificacionTestCase.crear_calificacion(self)
        url = f'/api/calificaciones/{calificacion_id}/'
        data = {
            'codigo_estudiante': 1,
            'codigo_curso': 1,
            'codigo_docente': 1,
            'nota_participacion': 9,
            'nota_tarea': 8,
            'nota_examen': 7,
            'fecha': '2023-10-08',
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        calificaciones = Calificacion.objects.all()
        calificacion = calificaciones.first()
        self.assertEqual(calificaciones.count(), 1)
        self.assertEqual(calificacion.CalPar, 9)
        self.assertEqual(calificacion.CalTar, 8)
        self.assertEqual(calificacion.CalExa, 7)
        self.assertEqual(calificacion.CalFec, '2023-10-08')
    
    def test_eliminar_calificacion(self):
        calificacion_id = CalificacionTestCase.crear_calificacion(self)
        url = f'/api/calificaciones/{calificacion_id}/'
        response = self.client.delete(url)
        calificaciones = Calificacion.objects.all()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(calificaciones.count(), 0)

CalificacionTestCase.crear_calificacion = staticmethod(CalificacionTestCase.crear_calificacion)