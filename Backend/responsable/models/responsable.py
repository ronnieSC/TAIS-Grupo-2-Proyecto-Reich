from django.db import models

class Responsable(models.Model):
    ResNom1 = models.CharField(max_length=64, verbose_name="primer nombre")
    ResNom2 = models.CharField(max_length=64, verbose_name="segundo nombre", null=True, blank=True)
    ResApePat = models.CharField(max_length=64, verbose_name="primer apellido")
    ResApeMat = models.CharField(max_length=64, verbose_name="segundo apellido")

    class Meta:
        verbose_name = "responsable"
        verbose_name_plural = "responsables"

    def instanciar_responsables():
        Responsable.objects.get_or_create(ResNom1="Valerio", ResNom2="Miguel", ResApePat="Armas", ResApeMat="Naola")
        Responsable.objects.get_or_create(ResNom1="Yanira", ResApePat="Mirella", ResApeMat="Amezquita")
        Responsable.objects.get_or_create(ResNom1="Marcos", ResNom2="Rafael", ResApePat="Vilca", ResApeMat="Zegarra")