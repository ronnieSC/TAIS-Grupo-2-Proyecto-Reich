from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from administrador.models.administrador import Administrador
from estudiante.models.estudiante import Estudiante
from clase.models.nivel import Nivel
from clase.models.grado import Grado

from personas.models.tipo_documento import TipoDocumento
from main.seeding import Seeding
import jwt

def usarCredenciales(client, usuario):
    user = usuario.UsuCod.UseCod
    client.force_authenticate(user=user)
    jwt_payload = {'user_id': user.id}
    jwt_token = jwt.encode(jwt_payload, 'test_key', algorithm='HS256')
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + jwt_token)

def finalizarSesion(client):
    client.logout()

def login_jwt(client):
    administrador = get_or_create_admin()
    usarCredenciales(client, administrador)

def get_or_create_admin():
    administradores = Administrador.objects.all()
    if len(administradores) == 0:
        Seeding.registrar_instancias()
        administrador = Administrador.objects.create(
            PerTipDocId = TipoDocumento.objects.first(),
            PerNumDoc   = 000000000,
            PerNom1     = 'admin',
            PerApePat   = 'test',
            PerApeMat   = 'case',
        )
        return administrador
    return administradores[0]
    # El username del administrador sera admin.test@reich.edu.pe

def get_or_create_student():
    estudiantes = Estudiante.objects.all()
    nivel = Nivel.objects.first()
    grado = Grado.objects.first()
    if len(estudiantes) == 0:
        Seeding.registrar_instancias()
        estudiante = Estudiante.objects.create(
            PerTipDocId = TipoDocumento.objects.get(id=1),
            PerNumDoc   = 000000000,
            PerNom1     = 'admin',
            PerApePat   = 'test',
            PerApeMat   = 'case',
            NivCod      = nivel,
            GraCod      = grado
        )
        return estudiante 
    return estudiantes[0]
    # El username del administrador sera admin.test@reich.edu.pe

class UsuarioTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        Seeding.registrar_instancias()
        login_jwt(self.client)
    
    def test_crear_administrador(self):
        res = get_or_create_admin()
        self.assertIsNotNone(res)
    
    def test_crear_estudiante(self):
        res = get_or_create_student()
        self.assertIsNotNone(res)
    
    def test_login_jwt(self):
        # consultando el perfil
        url = '/api/usuarios/perfil/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_permisos_administrador(self):
        url = '/api/administrador/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

from django.contrib.auth.models import User
class CambiarPasswordTestCase(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='admin', password='admin')
        self.client.force_authenticate(user=self.user)
        jwt_payload = {'user_id': self.user.id}
        jwt_token = jwt.encode(jwt_payload, 'test_key', algorithm='HS256')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + jwt_token)

    def test_cambiar_contrasena(self):
        """
        Caso de prueba: Cambiar contrasena
        Este test verifica que se pueda cambiar la contrasena utilizando la API de usuarios
        Pasos:
            1. Se crea un administrador (django)
            2. Se cambia la contrasena
        """
        url = '/api/usuarios/password/'
        data = {
            'antigua_password': 'admin',
            'nueva_password1': 'admin1234',
            'nueva_password2': 'admin1234'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('admin1234'))

    def test_cambiar_contrasena_incorrecta(self):
        """
        Caso de prueba: Cambiar contrasena
        Este test verifica que no se pueda cambiar la contrasena utilizando la API de usuarios
        Pasos:
            1. Se crea un administrador (django)
            2. Se cambia la contrasena
        """
        self.client.login(username='admin', password='admin')
        url = '/api/usuarios/password/'
        data = {
            'antigua_password': 'admin',
            'nueva_password1': 'admin1234',
            'nueva_password2': 'admin12345'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Las contraseñas no coinciden')
    

