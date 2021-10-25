export interface DatosGenerales {

    CONVERTIDOA: string;

    NOMBRENOTARIO: string;
    CODIGOPROTOCOLO: string;
    FECHAPROTOCOLO: Date;
    LUGAR: string;
    SUSTITUTO: string;
    TURNO: string;
    protocolos_IDIOMA: string;
    ENCARGADO: string;
    protocolos_ASESOR: string;

    FOLIOS: string;
    FOLIOSCOPIAS: string;
    CARASVACIAS: string;
    COPIASAUTORIZADAS: string;
    COPIASSIMPLES: string;
    protocolos_FOLIOSTELEMATICOS: string;
    protocolos_COPIASTELEMATICAS: string;
    protocolos_COPIASTELEMATICASSIM: string;

    protocolos_LEGITIMACIONES: string;
    protocolos_TESTIMONIOS: string;
    protocolos_DILIGENCIAS: string;
    protocolos_CEDULAS: string;

    NUMEROOPERACION?: string;

    protocolos_FIRMADOFUERA: string;
    COMPLETO: string;
    HAYGESTION: string;
    DOCUMENTORELACIONADO: string;
    HOJASINDUBITADAS: string;
    protocolos_TOMO: string;
    protocolos_FOLIO: string;

    protocolos_INVERSIONESEXTRANJERAS: string;
    OBSERVACIONES: string;
    protocolos_FVENCIMIENTO: string;

    HAYGESTIONCOBRO: boolean;
    Protocolos_PARCIAL: string;
    PIGNORACION: string;
    protocolos_NUMNOTARIOS: string;
    LRO_SECCION: string;
    LRO_NUMERO: string;
    ABIERTO: string;
    USUARIO: string;
    protocolos_APLICARHONPORNOTARIOS : string;

    DOCUMENTOADJUNTO: string;
}
