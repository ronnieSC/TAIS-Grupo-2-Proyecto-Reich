
from django.urls import path, include
from rest_framework import routers
from curso.views import CursoView

router = routers.DefaultRouter()
router.register(r'', CursoView, 'curso')

urlpatterns = [
    path("", include(router.urls)),
]



