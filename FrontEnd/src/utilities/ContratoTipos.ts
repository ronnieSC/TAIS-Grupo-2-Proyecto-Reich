import { Grado, Nivel } from "./ClaseTipos";
import { EstudianteEntidad } from "./EstudianteTipos";
import { ParienteEntidad } from "./ParienteTipos";

export const contrato_default: ContratoGuardado = {
  estudiante: {
    tipo_documento: 0,
    documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    apellido_materno: "",
    apellido_paterno: "",
    fecha_nacimiento: "",
    colegio_procedencia: "",
    destreza: "",
    direccion: "",
    ubigeo: "",
    grado_codigo: 0,
    nivel_codigo: 0,
  },
  parentescos: [
    {
      parentesco: "",
      apoderado: {
        tipo_documento: 0,
        documento: "",
        primer_nombre: "",
        segundo_nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        fecha_nacimiento: "",
        direccion: "",
        ubigeo: "",
        telefono: "",
        apoderado: true,
      },
    },
  ],
  matricula: {
    descuento: 0,
    monto_pactado: 0,
    responsable: 0,
  },
  guia: {
    descuento: 0,
    monto_pactado: 0,
    responsable: 0,
  },
  pension: {
    descuento: 0,
    monto_pactado: 0,
    responsable: 0,
    fecha_pagos: "",
  },
  condicion: "",
  firma_contrato: false,
  responsable_informacion: 0,
  documentos: [],
};

export interface ContratoGuardado {
  estudiante: EstudianteGuardado;

  parentescos: {
    parentesco: string;
    apoderado: ApoderadoGuardado;
  }[];
  matricula: AcuerdoMatricula;
  guia: AcuerdoGuias;
  pension: AcuerdoPension;
  condicion: string;
  firma_contrato: boolean;
  responsable_informacion: number;
  documentos: string[];
}

export interface EstudianteGuardado {
  tipo_documento: number;
  documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  fecha_nacimiento: string;
  colegio_procedencia: string;
  destreza: string;
  direccion: string;
  ubigeo: string;
  grado_codigo: number;
  nivel_codigo: number;
}

export interface ApoderadoGuardado {
  tipo_documento: number;
  documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  fecha_nacimiento: string;
  direccion: string;
  ubigeo: string;
  telefono: string;
  apoderado: boolean;
}

/*
 * Contrato Listado y Actualización
 */

export interface ContratoEntidad {
  estudiante: EstudianteEntidad;
  parentescos: ParienteEntidad[];
  matricula: Acuerdo;
  guia: Acuerdo;
  pension: AcuerdoPensionEdit;
  condicion: string;
  firma_contrato: boolean;
  responsable_informacion: number;
  documentos: DocumentoEntidad[];
  id: number;
}

export interface AcuerdoMatricula {
  descuento: number;
  monto_pactado: number;
  responsable: number;
}

export interface AcuerdoGuias {
  descuento: number;
  monto_pactado: number;
  responsable: number;
}

export interface Acuerdo extends AcuerdoMatricula {
  digitador?: [
    {
      id: number;
      usuario: string;
    }
  ];
  id: number;
}

export interface AcuerdoPension {
  descuento: number;
  monto_pactado: number;
  responsable: number;
  fecha_pagos: string;
}

export interface AcuerdoPensionEdit extends AcuerdoPension {
  digitador?: [
    {
      id: number;
      usuario: string;
    }
  ];
  id: number;
}

export interface informacionNuevoContrato {
  tipo_doc: [
    {
      id: number;
      TipDocTip: string;
      TipDocDesCor: string;
      TipDocDesLar: string;
    }
  ];
  niveles: Nivel[];
  grados: Grado[];
  annos_academicos: AnnoAcademico[];
  precios: Precio[];
  razones: Razon[];
  responsables: Responsable[];
  documentos: Documento[];
}

export interface InformacionContrato {
  contratos: ContratoEntidad[];
  informacion: informacionNuevoContrato;
}

export interface Responsable {
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  id: number;
}

export interface Precio {
  ano_codigo: number;
  nivel_codigo: number;
  razon_codigo: number;
  monto: number;
}

export interface Razon {
  razon: string;
  id: number;
}

export interface AnnoAcademico {
  id: number;
  AnoAcaNum: string;
}

export interface Documento {
  id: number;
  tipo_documento: string;
}

export interface DocumentoEntidad {
  id: number;
  nombre_documento: string;
  entregado: boolean;
}

export interface usuario {
  id: number;
  username: string;
}
