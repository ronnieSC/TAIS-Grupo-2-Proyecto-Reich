from contrato.models.documento import Documento
from fechaAcademica.models.fecha_academica import FechaAcademica
from clase.models.clase import Clase
from curso.models.curso import Curso
from personas.models.persona import Persona
from usuario.models.rol import Rol
from precios.models.razon import Razon
from docente.models.actividad import Actividad
from responsable.models.responsable import Responsable

class Seeding:
    def registrar_instancias():
        # Documentos
        Documento.instanciar_documentos()
        # Fechas academicas
        FechaAcademica.instanciar_fechas()
        # Cursos
        Curso.instanciar_cursos()
        # Grados y niveles
        Clase.instanciar_requisitos_clases()
        # Personas
        Persona.instanciar_requisitos_persona()
        # Roles
        Rol.instanciar_roles()
        # Razon de pago
        Razon.instanciar_razones()
        # Actividades 
        Actividad.instanciar_actividades()
        # Responsables
        Responsable.instanciar_responsables()


