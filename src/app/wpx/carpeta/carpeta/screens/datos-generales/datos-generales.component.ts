import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Combobox } from 'src/app/class/combobox';
import { DatosGenerales } from 'src/app/interfaces/carpeta/datos-generales';
import { WpxServicesService } from 'src/app/services/wpx-services.service';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss']
})
export class DatosGeneralesComponent implements OnInit {

  @Input() dGenerales: DatosGenerales;
  
  @Output() updateDG = new EventEmitter<DatosGenerales>();
  @Output() errorDG = new EventEmitter<string>();



  _color = 'primary';

  _sustitutos: Combobox[] = [];


  _turnos: Combobox[] = [];
  _idiomas: Combobox[] = [];
  _empleados: Combobox[] = [];
  _asesores: Combobox[] = [];



  _sustituto: string;
  _turno: string;

  _firmaFuera: boolean = false;
  _completo: boolean = false;
  _hayGestion: boolean = false;

  _art174: boolean = false;
  _pignoracion: boolean = false;
  _parcial: boolean = false;


  _otroDocumento: string = "";
  _otrosDocumentos: Combobox[] = [];

  constructor(private services: WpxServicesService,
    private dbService: NgxIndexedDBService) {

    // this.dGenerales.CODIGOPROTOCOLO="";

  }

  ngOnInit(): void {
    this.dGenerales.CODIGOPROTOCOLO = "";

    setTimeout(() => {
      this.loadInitial();
    }, 500); /* 500 */
  }


  loadInitial(): void {

    let tablas = ({
      'tabla': 'NOTARIOS',
      'campo': '',
      'campossql': 'CODIGONOTARIO,NOMBRENOTARIO',
      'noSQL': 'notarios',
      'where': 'CODIGONOTARIO<>\'*\'',
      'order': 'CODIGONOTARIO',
      'group': ''
    });

    this.services.getData(tablas).subscribe(dataWS => {
      dataWS.detail.forEach((values: any, index: any) => {
        this._sustitutos.push({ value: values["CODIGONOTARIO"], viewValue: values["NOMBRENOTARIO"] });
      });

    }, error => {
      this.errorDG.emit("Error al cargar: \r\n 'Datos Generales [sustitutos]'.");
      console.error(error.status + " " + error.statusText);
    });



    tablas = ({
      'tabla': 'EMPLEADOS',
      'campo': '',
      'campossql': 'CODIGOEMPLEADO,NOMBREEMPLEADO',
      'noSQL': '',
      'where': '',
      'order': 'CODIGOEMPLEADO',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._empleados.push({ value: values["CODIGOEMPLEADO"], viewValue: values["CODIGOEMPLEADO"] + ' - ' + values["NOMBREEMPLEADO"] });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });


    tablas = ({
      'tabla': 'venus_dat_GESTORES',
      'campo': '',
      'campossql': 'gestores_ALIAS,gestores_NOMBRE',
      'noSQL': '',
      'where': '',
      'order': 'gestores_ALIAS',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._asesores.push({ value: values["gestores_ALIAS"], viewValue: values["gestores_ALIAS"] + ' - ' + values["gestores_NOMBRE"] });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

    this.dbService.getAll("turnos").subscribe((valuesTable) => {
      valuesTable.forEach((values: any, index: any) => {
        this._turnos.push({ value: values["CODIGOTURNO"], viewValue: values["DESCRIPCIONTURNO"] });
      });
    }, error => {
      this.errorDG.emit("Error al cargar: 'Datos Generales' [turnos].")
    });


    this.dbService.getAll("idiomas").subscribe((valuesTable) => {
      valuesTable.forEach((values: any, index: any) => {
        this._idiomas.push({ value: values["CODIGOIDIOMA"], viewValue: values["DESCRIPCIONIDIOMA"] });
      });
    }, error => {
      this.errorDG.emit("Error al cargar: 'Datos Generales' [idiomas].")
    });


    setTimeout(() => {

      this._sustituto = this.dGenerales.SUSTITUTO;
     
      this._firmaFuera = ((this.dGenerales.protocolos_FIRMADOFUERA).toString() == "0" ? false : true);
      this._completo = ((this.dGenerales.COMPLETO).toString() == "0" ? false : true);
      this._hayGestion = ((this.dGenerales.HAYGESTION).toString() == "0" ? false : true);
      this._art174 = ((this.dGenerales.protocolos_INVERSIONESEXTRANJERAS).toString() == "0" ? false : true);
      this._pignoracion = ((this.dGenerales.PIGNORACION).toString() == "0" ? false : true);
      this._parcial = ((this.dGenerales.Protocolos_PARCIAL).toString() == "0" ? false : true);


      if (!this.dGenerales.DOCUMENTOADJUNTO == null) {
        let tmpOtrosDocumentos = this.dGenerales.DOCUMENTOADJUNTO.split(";");
        tmpOtrosDocumentos.forEach((values: any, index: any) => {
          this._otrosDocumentos.push({ value: values, viewValue: values });
        });
      };
    }, 5000); /* 3000 */


  }



  changeValues(): void {

    if (this._sustituto == undefined) {
      this.dGenerales.SUSTITUTO = "";
    } else {

      this.dGenerales.SUSTITUTO = this._sustituto;
    }

    if (this.dGenerales.TURNO === undefined) {
      this.dGenerales.TURNO = "";
    }

    if (this.dGenerales.ENCARGADO === undefined) {
      this.dGenerales.ENCARGADO = "";
    }

    if (this.dGenerales.TURNO === undefined) {
      this.dGenerales.TURNO = "";
    }

    if (this.dGenerales.protocolos_ASESOR === undefined) {
      this.dGenerales.protocolos_ASESOR = "";
    }


    // this._otrosDocumentos.forEach({})


    this.dGenerales.protocolos_FIRMADOFUERA = (this._firmaFuera == true ? "1" : "0");
    this.dGenerales.COMPLETO = (this._completo == true ? "1" : "0");
    this.dGenerales.HAYGESTION = (this._hayGestion == true ? "1" : "0");
    this.dGenerales.protocolos_INVERSIONESEXTRANJERAS = (this._art174 == true ? "1" : "0");

    this.dGenerales.PIGNORACION = (this._pignoracion == true ? "1" : "0");
    this.dGenerales.Protocolos_PARCIAL = (this._parcial == true ? "1" : "0");


    console.info("changeValues");
    console.warn(this.dGenerales);
    this.updateDG.emit(this.dGenerales);



  }



}