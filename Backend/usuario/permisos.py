from rest_framework import permissions
from usuario.models.usuario import Usuario
from main.settings import INTERFACE_ROLES

class EsAdministrador(permissions.BasePermission):
    message = "No cuenta con los permisos necesarios para realizar esta accion"
    def has_permission(self, request, view):
        try:
            user = request.user
            rol = Usuario.objects.get(UseCod=user.pk).RolCod.RolNom
            if rol in [INTERFACE_ROLES.ADMINISTRADOR]:
                return super().has_permission(request, view)
            return False
        except Exception as err:
            return False

class EsDocente(permissions.BasePermission):
    message = "No cuenta con los permisos necesarios para realizar esta accion"
    def has_permission(self, request, view):
        try: 
            user = request.user
            rol = Usuario.objects.get(UseCod=user.pk).RolCod.RolNom
            classname = view.__class__.__name__
            method = request.method 
            if method in ['DELETE']:
                return True
            if method in ['POST'] and not (classname in ['ObservacionView']):
                return True
            if method in ['PUT'] and not (classname in ['DocenteView', 'ObservacionView']):
                return True
            if method in ['GET'] and classname in ['AdministradorViewSet']:
                return False
            if rol in [INTERFACE_ROLES.DOCENTE]:
                return super().has_permission(request, view)
            return False
        except Exception as err:
            print(err)
            return False

class EsApoderado(permissions.BasePermission):
    message = "No cuenta con los permisos necesarios para realizar esta accion"
    def has_permission(self, request, view):
        try: 
            user = request.user
            rol = Usuario.objects.get(UseCod=user.pk).RolCod.RolNom
            classname = view.__class__.__name__
            method = request.method
            if method in ['POST', 'DELETE']:
                return False
            if method in ['GET'] and classname in ['AdministradorViewSet', 'ObservacionView']:
                return False
            if method in ['PUT'] and (classname in ['ParentescoView', 'ApoderadoView']):
                return False
            if rol in [INTERFACE_ROLES.APODERADO]:
                return super().has_permission(request, view)
            return False
        except Exception as err:
            return False

class EsEstudiante(permissions.BasePermission):
    message = "No cuenta con los permisos necesarios para realizar esta accion"
    def has_permission(self, request, view):
        try: 
            user = request.user
            rol = Usuario.objects.get(UseCod=user.pk).RolCod.RolNom
            classname = view.__class__.__name__
            method = request.method
            if method in ['PUT', 'POST', 'DELETE']:
                return False
            if method in ['GET'] and classname in ['AdministradorViewSet', 'ObservacionView']:
                return False
            if rol in [INTERFACE_ROLES.ESTUDIANTE]:
                return super().has_permission(request, view)
            return False
        except Exception as err:
            return False
