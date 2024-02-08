
# Para las excepciones de acceso
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

class AccessException(PermissionDenied):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Usted no cuenta con acceso a este módulo"
    default_code = 'invalid'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code
