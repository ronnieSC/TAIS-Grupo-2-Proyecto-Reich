from django.urls import path, include
from rest_framework import routers

from responsable import views

router = routers.DefaultRouter()
router.register('', views.ResponsableViewSet, 'responsables')

urlpatterns = [
    path("", include(router.urls)),
]