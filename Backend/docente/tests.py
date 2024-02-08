from django.test import TransactionTestCase
from rest_framework import status
from rest_framework.test import APIClient

from docente.models.bloque import Bloque
from docente.models.docente import Docente
from docente.models.horario import Horario
from main.settings import INTERFACE_ROLES

from usuario.tests import login_jwt, usarCredenciales, finalizarSesion
from main.seeding import Seeding
from contrato.tests import ContratoTestCase

class DocenteTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        Seeding.registrar_instancias()
        login_jwt(self.client)

    def crear_docentes(testCase):
        url = '/api/docentes/'
        data1 = {"tipo_documento":1, "documento":'00000001', "apellido_paterno":'test', "apellido_materno":'case', "primer_nombre":'docente_1', "fecha_nacimiento":'08-07-2000', "telefonos_alternativos":[{"telefono":"987654321"}, {"telefono":"123456789"}], "codigo_cursos":[1, 2]}
        data2 = {"tipo_documento":1, "documento":"00000002", "apellido_paterno":"test", "apellido_materno":"case", "primer_nombre":"docente_2", "fecha_nacimiento":"07-07-2000", "direccion": "test", "ubigeo": "000", "telefono": "" }
        response1 = testCase.client.post(url, data1, format='json')
        response2 = testCase.client.post(url, data2)
        testCase.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        testCase.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        return response1.data['id']
    
    def test_crear_docente(self):
        """
        Caso de prueba: Crear docente
        Este test verifica que se puede crear un docente utilizando la API de docentes
        Pasos: 
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar que se crearon 2 docentes
            3. Verificar que los datos del primer docente son correctos
                - PerNom1: docente_1
                - PerApePat: test
                - PerApeMat: test
                - PerNumDoc: 00000001
                - El rol mediante la relacion 'Usuario': DOCENTE
                - La cantidad de cursos asociados al docente es 2
                - La cantidad de telefonos alternativos asociados al docente es 2
        """
        DocenteTestCase.crear_docentes(self)
        docentes = Docente.objects.all()
        self.assertEqual(docentes.count(), 2)
        self.assertEqual(docentes[0].PerNom1, 'docente_1')
        self.assertEqual(docentes[0].PerApePat, 'test')
        self.assertEqual(docentes[0].PerApeMat, 'case')
        self.assertEqual(docentes[0].PerNumDoc, '00000001')
        self.assertEqual(docentes[0].UsuCod.RolCod.RolNom, INTERFACE_ROLES.DOCENTE)
        self.assertEqual(docentes[0].DocCur.count(), 2)
        self.assertEqual(docentes[0].telefono_set.count(), 2)

    def test_ver_docentes(self):
        """
        Caso de prueba: Ver docentes
        Este test verifica que se puede ver la lista de docentes utilizando la API de docentes
        Pasos:
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar que el codigo de estado sea HTTP 200 OK
            3. Verificar que la cantidad de docentes sea 2
        """
        url = '/api/docentes/'
        DocenteTestCase.crear_docentes(self)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Se esperaba un status HTTP 200 OK")
        self.assertEqual(len(response.data), 2, "Se esperaban 2 docentes")

    def test_actualizar_docente(self):
        """
        Caso de prueba: Actualizar docente
        Este test verifica que se puede actualizar un docente utilizando la API de docentes
        Pasos:
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar que el codigo de estado sea HTTP 200 OK
            3. Verificar que los datos del docente actualizado son correctos
                - PerNom1: Lucas
                - PerNom2: Mejia
                - PerApePat: Escobar
                - PerApeMat: Luque
                - PerNumDoc: 64829232
        """
        url = '/api/docentes/1/'
        DocenteTestCase.crear_docentes(self)
        data = {"tipo_documento":1, "documento":"64829232", "primer_nombre":"Lucas", "segundo_nombre":"Mejia", "apellido_paterno":"Escobar", "apellido_materno":"Luque", "fecha_nacimiento":"08-07-2000", "direccion":"test","ubigeo":"000", "telefono":""}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Se esperaba un status HTTP 200 OK")
        docente = Docente.objects.get(pk=1)
        self.assertEqual(docente.PerNom1, 'Lucas', "Se esperaba que el primer nombre sea 'Lucas'")
        self.assertEqual(docente.PerNom2, 'Mejia', "Se esperaba que el segundo nombre sea 'Mejia'")
        self.assertEqual(docente.PerApePat, 'Escobar', "Se esperaba que el apellido paterno sea 'Escobar'")
        self.assertEqual(docente.PerApeMat, 'Luque', "Se esperaba que el apellido materno sea 'Luque'")
        self.assertEqual(docente.PerNumDoc, '64829232', "Se esperaba que el numero de documento sea '64829232'")

    def test_eliminar_docente(self):
        """
        Caso de prueba: Eliminar docente
        Este test verifica que se puede eliminar un docente utilizando la API de docentes
        Pasos:
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar el codigo de estado sea HTTP 204 NO CONTENT
            3. Verificar que solo exista un docente
        """
        url = '/api/docentes/1/'
        DocenteTestCase.crear_docentes(self)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, "Se esperaba un status HTTP 204 NO CONTENT")
        docentes = Docente.objects.all()
        self.assertEqual(docentes.count(), 1, "Se esperaban 1 docente")
    
    def test_cursos_asignados(self):
        """
        Caso de prueba: Cursos asignados
        Este test verifica que se puede ver la lista de cursos asignados a un docente utilizando la API de docentes
        Pasos:
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar el codigo de estado sea HTTP 200 OK
            3. Asignar un bloque al docente
            4. Verificar que exista un curso asignado al docente
        """
        url = '/api/docentes/cursosAsignados/'
        ContratoTestCase.crear_contrato(self)
        HorarioTestCase.crear_bloques(self)
        finalizarSesion(self.client)
        usarCredenciales(self.client, Docente.objects.get(id=1))
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Se esperaba un status HTTP 200 OK")
        self.assertEqual(response.data[0].get('curso'), "PsT")
        self.assertEqual(response.data[0].get('nivel'), "Primaria")
        self.assertEqual(response.data[0].get('grado'), "1")
        self.assertEqual(response.data[0].get('dia'), "Lunes")
        self.assertEqual(response.data[0].get('hora_inicio'), "08:00")
        self.assertEqual(response.data[0].get('hora_fin'), "09:20")
    
    def test_listado_alumnos(self):
        """
        Caso de prueba: Listado de alumnos
        Este test verifica que se puede ver la lista de alumnos de un docente utilizando la API de docentes
        Pasos:
            1. Crear docentes con la funcion: self.crear_docentes()
            2. Verificar el codigo de estado sea HTTP 200 OK
            3. Asignar un bloque al docente
            4. Verificar que exista un listado de alumnos
        """
        ContratoTestCase.crear_contrato(self)
        bloque_id = HorarioTestCase.crear_bloques(self)
        url = f'/api/docentes/listadoAlumnos/{bloque_id}/'
        finalizarSesion(self.client)
        usarCredenciales(self.client, Docente.objects.get(id=1))
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK, "Se esperaba un status HTTP 200 OK")
        self.assertEqual(len(response.data.get('estudiantes')), 1)
        self.assertEqual(response.data.get('nivel'), "Primaria")
        self.assertEqual(response.data.get('grado'), "1")
        self.assertEqual(response.data.get('codigo_docente'), 1)

class HorarioTestCase(TransactionTestCase):
    reset_sequences = True
    def setUp(self):
        self.client = APIClient()
        login_jwt(self.client)

    def crear_horarios(testCase):
        url = '/api/docentes/horario/'
        horario_data_1 = {'codigo_nivel':1, 'codigo_grado':1}
        horario_data_2 = {'codigo_nivel':2, 'codigo_grado':2}
        response_1 = testCase.client.post(url, horario_data_1)
        response_2 = testCase.client.post(url, horario_data_2)
        testCase.assertEqual(response_1.status_code, status.HTTP_201_CREATED)
        testCase.assertEqual(response_2.status_code, status.HTTP_201_CREATED)
        testCase.assertEqual(Horario.objects.all().count(), 2)
    
    def crear_bloques(testCase):
        url = '/api/docentes/bloques/'
        HorarioTestCase.crear_horarios(testCase)
        DocenteTestCase.crear_docentes(testCase)
        bloque_data_1 = {'codigo_horario':1, 'codigo_curso':1, 'codigo_docente': 1, 'codigo_dia':1, 'codigo_actividad':1, 'hora_inicio':'08:00', 'hora_fin':'09:20'}
        bloque_data_2 = {'codigo_horario':2, 'codigo_curso':4, 'codigo_docente': 1, 'codigo_dia':3, 'codigo_actividad':3, 'hora_inicio':'09:20', 'hora_fin':'10:40'}
        response_1 = testCase.client.post(url, bloque_data_1)
        response_2 = testCase.client.post(url, bloque_data_2)
        testCase.assertEqual(response_1.status_code, status.HTTP_201_CREATED)
        testCase.assertEqual(response_2.status_code, status.HTTP_201_CREATED)
        testCase.assertEqual(len(Bloque.objects.all()), 2)
        return response_1.data.get('id')
        
    # Intercambide bloques (docente, curso, actividad)
    def test_intercambio_bloques(self):
        url = '/api/docentes/horario/intercambiar/'
        HorarioTestCase.crear_bloques(self)
        codigo_bloque_1 = 1
        codigo_bloque_2 = 2
        pre_bloque1 = Bloque.objects.get(pk=codigo_bloque_1)
        data = {
            "codigo_bloque_1": codigo_bloque_1,
            "codigo_bloque_2": codigo_bloque_2 
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pos_bloque2 = Bloque.objects.get(pk=codigo_bloque_2)
        self.assertEqual(pre_bloque1.DocCod, pos_bloque2.DocCod)
        self.assertEqual(pre_bloque1.CurCod, pos_bloque2.CurCod)
        self.assertEqual(pre_bloque1.ActCod, pos_bloque2.ActCod)
    
    def test_generar_password_docente(self):
        """
        Caso de prueba: Generar password docente 
        Este test verifica que se pueda generar una contraseña utilizando la API de Docentes
        Pasos:
            1. Se crea un docente
            2. Se verifica que genere la contraseña
            3. se verifica que el detalle sea el mensaje de contraseña generada
            4. Se verifica que se haya generado la contraseña 
        """
        docente_id = DocenteTestCase.crear_docentes(self)
        url = f'/api/docentes/generar-password/{docente_id}/'
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Contraseña generada correctamente')
        self.assertEqual(len(response.data['password']), 8)

DocenteTestCase.crear_docentes = staticmethod(DocenteTestCase.crear_docentes)
HorarioTestCase.crear_bloques = staticmethod(HorarioTestCase.crear_bloques)
HorarioTestCase.crear_horarios = staticmethod(HorarioTestCase.crear_horarios)