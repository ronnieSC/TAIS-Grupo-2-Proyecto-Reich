from django.urls import path, include
from rest_framework import routers

from precios.views import PrecioView 
from precios.views import RazonView

router = routers.DefaultRouter()
router.register(r'razon', RazonView, 'razon')
router.register(r'', PrecioView, 'precio')

urlpatterns = [
    path("", include(router.urls)),
]

