from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from main.seeding import Seeding
from usuario.tests import login_jwt

class FechaAcademicaTestCase(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)
        Seeding.registrar_instancias()

    def test_listar_dias(self):
        response = self.client.get('/api/fechaAcademica/dias/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 7)

    def test_listar_semanas(self):
        response = self.client.get('/api/fechaAcademica/semanas/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 8)
    
    def test_listar_bimestres(self):
        response = self.client.get('/api/fechaAcademica/bimestres/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6)
    
    def test_listar_anos_academicos(self):
        response = self.client.get('/api/fechaAcademica/anosAcademicos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)