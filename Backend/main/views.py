
from django.shortcuts import render
from main.settings import DEBUG

def APIHome(request):
    DEBUG
    return render(request, 'home.html', {'debug':DEBUG})