from weasyprint import HTML
from django.shortcuts import render
from main.settings import BASE_DIR
from datetime import datetime
from contrato.models.contrato import Contrato
import os

def generar_reporte_contrato(request, contrato:Contrato):
    logo_path = 'file://'+os.path.join(BASE_DIR, 'static', 'reich_logo.png')
    parentesco = contrato.parentesco_set.all()
    if parentesco.count() <= 0:
        raise ValueError('El contrato no tiene un apoderado registrado')
    else:
        parentesco = parentesco.first()
    data = {
        "contrato": contrato,
        "logo": logo_path,
        "fecha_actual": datetime.now(),
        "apoderado": parentesco.ParApoId,
        "parentesco": parentesco.ParPar
    }
    html_template = render(request, 'contrato.html', data)
    pdf = HTML(string=html_template.content).write_pdf()
    return pdf
