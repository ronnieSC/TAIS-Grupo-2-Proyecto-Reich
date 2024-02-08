export type InformacionConfiguracion = {

    AnioAcademicoGuardado: AnioAcademicoGuardado[];
    PrecioGuardado: PrecioGuardado[];
    EncargadoGuardado: EncargadoGuardado[];
    TipoDocumentoGuardado: TipoDocumentoGuardado[];
    NivelGuardado: NivelGuardado [];
    ActividadGuardada: ActividadGuardada[];
    Razones: RazonGuardada[];
    documentosContratos: DocumentoContratoGuardado[];
}
export type ConfiguracionEntidad = {
    niveles:NivelGuardado[];
    tipodocumentos: TipoDocumentoGuardado[];
    actividades: ActividadGuardada[];
    precios: PrecioGuardado[];
    grados:GradoGuardado[];
    aniosAcademicos: AnioAcademicoGuardado[];
    encargados:EncargadoGuardado[];
    razones: RazonGuardada[];
    contratoDocumentos: DocumentoContratoGuardado[];
}

export type GradoGuardado = {
    grado: number;
    id: number;
}

export type AnioAcademicoGuardado = {
    AnoAcaNum: number;
    id: number;
}

export type PrecioGuardado = {
    ano_codigo: number;
    nivel_codigo: number;
    razon_codigo: number;
    monto: number;
    id: number;
}

export type EncargadoGuardado = {
    primer_nombre: string;
    segundo_nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    id: number
}

export type TipoDocumentoGuardado ={
    TipDocTip: string; //2 letras
    TipDocDesCor: string; 
    TipDocDesLar: string;
    id: number;
}

export type NivelGuardado = {
    nivel: string;
    id: number;
}

export type ActividadGuardada = {
    actividad: string;
    id: number;
}

export type RazonGuardada = {
    razon: string;
    id: number;
}

export type DocumentoContratoGuardado = {
    tipo_documento:string;
    id:number;
}

