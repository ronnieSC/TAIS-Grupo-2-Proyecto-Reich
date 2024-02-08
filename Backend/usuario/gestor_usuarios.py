from django.contrib.auth.models import User
from django.db import transaction 
from usuario.models.rol import Rol
from usuario.models.usuario import Usuario
from main.settings import INTERFACE_ROLES

import string
import random

class GestorUsuarios():
    def crear_contrasena(len):
        caracteres = string.ascii_letters + string.digits + string.punctuation
        contrasena = ''.join(random.choice(caracteres) for i in range(len))
        return contrasena

    def crear_usuario(username, password, rol):
        user = User.objects.create_user(
            username=username,
            password=password,
            # Permitiendo acceso a /admin si es que se trata solamente de administradores
            is_staff=True if rol==INTERFACE_ROLES.ADMINISTRADOR else False,
        )
        # Asignando o creando el rol de estudiante
        rol_instance, _created = Rol.objects.get_or_create(
            RolNom = rol
        )
        # Creando el usuario formal
        usuario_formal = Usuario.objects.create(
            RolCod = rol_instance,
            UseCod = user
        )
        return usuario_formal

    def crear_usuario_estudiante(codigo, nombre, paterno):
        try:
            with transaction.atomic():
                if nombre and paterno:
                    username= f'{codigo}.{nombre}.{paterno}@reich.edu.pe'.lower()
                    password = GestorUsuarios.crear_contrasena(12)
                    rol = INTERFACE_ROLES.ESTUDIANTE
                    usuario = GestorUsuarios.crear_usuario(username=username, password=password, rol=rol)
                    return usuario 
                else:
                    raise Exception("No se ha podido crear el usuario")
        except Exception as err:
            raise err

    def crear_usuario_administrador(nombre, paterno):
        try:
            with transaction.atomic():
                if nombre and paterno:
                    username= f'{nombre}.{paterno}@reich.edu.pe'.lower()
                    password = GestorUsuarios.crear_contrasena(12)
                    rol = INTERFACE_ROLES.ADMINISTRADOR
                    usuario = GestorUsuarios.crear_usuario(username=username, password=password, rol=rol)
                    return usuario 
                else:
                    raise Exception("No se ha podido crear el usuario")
        except Exception as err:
            raise err

    def crear_usuario_apoderado(nombre, paterno):
        try:
            with transaction.atomic():
                if nombre and paterno:
                    username= f'{nombre}.{paterno}@reich.edu.pe'.lower()
                    password = GestorUsuarios.crear_contrasena(12)
                    rol = INTERFACE_ROLES.APODERADO
                    usuario = GestorUsuarios.crear_usuario(username=username, password=password, rol=rol)
                    return usuario 
                else:
                    raise Exception("No se ha podido crear el usuario")
        except Exception as err:
            raise err

    def crear_usuario_docente(nombre, paterno):
        try:
            with transaction.atomic():
                if nombre and paterno:
                    username= f'{nombre}.{paterno}@reich.edu.pe'.lower()
                    password = GestorUsuarios.crear_contrasena(12)
                    rol = INTERFACE_ROLES.DOCENTE
                    usuario = GestorUsuarios.crear_usuario(username=username, password=password, rol=rol)
                    return usuario 
                else:
                    raise Exception("No se ha podido crear el usuario")
        except Exception as err:
            raise err
