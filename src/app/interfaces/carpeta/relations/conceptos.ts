import { Clase } from "../auxiliar/clase";
import { EstructuraConcepto } from "../auxiliar/estructura-concepto";
import { LoadFieldsConcepto } from "../auxiliar/load-fields-concepto";

export interface Conceptos {
    id: String;
    idConcepto: string;
    descripcion: string;
    fieldConcepto: LoadFieldsConcepto;
    estructura: EstructuraConcepto;
    idW?: number;
    comparecientesClase?: Clase;
    
}
