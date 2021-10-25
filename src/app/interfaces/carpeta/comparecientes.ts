export interface Comparecientes {

    DNI: string; 

    comparecientes_NOMBRE?: string;
    comparecientes_PRIMERAPELLIDO: string;
    comparecientes_SEGUNDOAPELLIDO?: string;

    CONCEPTOINTERVENCION: string; 
    VIA: string; 
    DOMICILIO: string; 
    NUMERO: string;
    CODIGOPOSTAL: string;

    MUNICIPIO: string; 
    PEDANIAOBARRIO?: string; 
    PROVINCIA: string; 
    BIS?: boolean;
    PUERTA?: string;
    BLOQUE?: string; 
    ESCALERA?: string; 
    PAIS: string;


    ESTADOCIVIL?: string; 
    comparecientes_NACIONALIDAD: string;
    comparecientes_REGIMENECONOMICO?: string;


    APROXPOSTAL?: string; 
    comparecientes_RESTODIRECCION?: string; 
    comparecientes_PROFESION?: string;

    comparecientes_CLASE: string;
    comparecientes_TIPOCOMPARECENCIA: string;
    comparecientes_PRESENCIA: string; 
    PISO?: string;
    comparecientes_CLASEINTERVENCION: string; 
    comparecientes_TIPOAFECTADO?: string;

    
    comparecientes_ENTIDADBANCARIA?: string;

    comparecientes_PROFAPODERADO?: string;
    comparecientes_TIPOPARENTESCO?: string;
    comparecientes_PARIENTE?: string;
    comparecientes_CLASECARGO?: string;
    comparecientes_TIPOCARGO?: string;

    comparecientes_REPARTO?: string; 
    idW?: number;
/* */
    SEXO?: string;
    FAX?: string;

    TELEFONO?: string;
    EMAIL?: string;
    sujetos_MOVIL?: string;


    sujetos_TIPOIDE: string;

}
