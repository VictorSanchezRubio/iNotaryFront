import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { GlobalFunctions } from 'src/app/global/global-functions';
import { LoadFieldsConcepto } from 'src/app/interfaces/carpeta/auxiliar/load-fields-concepto';
import { Comparecientes } from 'src/app/interfaces/carpeta/comparecientes';
import { DatosGenerales } from 'src/app/interfaces/carpeta/datos-generales';
import { Conceptos } from 'src/app/interfaces/carpeta/relations/conceptos';
import { Suplidos } from 'src/app/interfaces/carpeta/suplidos';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { SnackBarComponent } from '../../helper/snack-bar/snack-bar.component';
import { ActosComponent } from './screens/actos/actos.component';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.scss']
})
export class CarpetaComponent implements OnInit {


  @Input() protocolo: any;


  @ViewChild(ActosComponent) actos: ActosComponent;




  /* Globals */



  _idConceptoSeleccion;
  _numConcepto: number = 1;
  _lastidW: number = 0;


  // _background = "primary";
  _background = "#336633";

  _wordIsOpend = false;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  timeOut = 5;

  /* Datos Generales */
  _dGenerales: DatosGenerales[] = [];


  /* Suplidos */
  _suplidos: Suplidos[] = [];



  /* Conceptos */
  _conceptos: Conceptos[] = [];



  /* Comparecientes */
  _comparecientes: Comparecientes[] = [];




  constructor(private services: WpxServicesService,
    private _snackBar: MatSnackBar) {




  }

  ngOnInit(): void {

    console.log("OnInit");
    // setTimeout(() => {
    this._loadDatosGenerales();
    //   console.log("_loadDatosGenerales");
    // },50);

  }


   _loadDatosGenerales(): void {

    const value = '{"tramite":"' + (this.protocolo).replace("/", "_") + '"}';

     this.services.loadTramiate(value).then(data => {

      this._dGenerales = data["detail"]["DG"];
      this._suplidos = data["detail"]["SUPLIDOS"];
      this._conceptos = data["detail"]["CONCEPTOS"];

      if (this._conceptos.length > 0) {

        this._numConcepto = this._conceptos.length;
        this._idConceptoSeleccion = this._conceptos[this._numConcepto - 1]["id"];
        this._lastidW = this._conceptos[this._numConcepto - 1]["idW"]

      }

    /*
    this.services.loadTramiate(value).subscribe(data => {

      this._dGenerales = data["detail"]["DG"];
      this._suplidos = data["detail"]["SUPLIDOS"];
      this._conceptos = data["detail"]["CONCEPTOS"];

      if (this._conceptos.length > 0) {

        this._numConcepto = this._conceptos.length;
        this._idConceptoSeleccion = this._conceptos[this._numConcepto - 1]["id"];


      }

      */
      /*
            console.info("Load Values Tramite");
            console.info("_dGenerales");
            console.log(this._dGenerales);
      
            console.log("_suplidos");
            console.log(this._suplidos);
      */
    })

  }





  save(): void {

    const value = '{"tramite":"' + (this.protocolo).replace("/", "_") + '"}';

    const fields = {
      DG: this._dGenerales,
      SUPLIDOS: this._suplidos,
      CONCEPTOS: this._conceptos
    };


    this.services.updateTramite(value, fields).subscribe(data => {


      this._snackBar.openFromComponent(SnackBarComponent,
        {
          duration: (this.timeOut * 1000),
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          data: "Datos guardados correctamente.",
          panelClass: 'ok-snackbar'
        });

    }, error => {
      console.error(error);


      this._snackBar.openFromComponent(SnackBarComponent,
        {
          duration: (this.timeOut * 1000),
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          data: error,
          panelClass: "error-snackbar"

        });



    });



    //    console.log(this._dGenerales);

  }


  updateDGformComponent(values: DatosGenerales[]) {

    // console.warn("updateDGFormComponent");

    // console.log(values);
    this._dGenerales = values;

    this.actos.calcularSuplidos(this._dGenerales);


  }

  loadConcepto() {
    return this._conceptos;
  }


  addConceptoSelect(values: any) {

    console.warn(values);

    let fieldsConcepto: any = [];
    let concepto = '{"codigo":"' + values.indunico_CODIGO + '"}';

    this.services.loadFieldsConcepto(concepto).subscribe(data => {

      fieldsConcepto = data.detail[0];


      if (fieldsConcepto.indunico_ESTRUCTURASINCUANTIA != '' && fieldsConcepto.indunico_ESTRUCTURACONCUANTIA == '') {

        let estructura = '{"estructura":"' + fieldsConcepto.indunico_ESTRUCTURASINCUANTIA + '"}';

        this.services.loadStructureConcepto(estructura).subscribe(dataEstructura => {

          let id = GlobalFunctions.newGuid();
          this._lastidW = this._lastidW + 1;

          this._conceptos.push({
            id: id,
            idConcepto: values.indunico_CODIGO,
            descripcion: values.indunico_DESCRIPCION,
            fieldConcepto: fieldsConcepto,
            estructura: dataEstructura.detail,
            idW: this._lastidW
          });



          this._numConcepto += 1;
          this._idConceptoSeleccion = id;

          // console.warn(this._conceptos);


        }, error => {
          this.errorLoadaFields("Error reading structure.");

        })

      }

    }, error => {
      this.errorLoadaFields("Error reading concept.")
    })

  }

  errorLoadaFields(value: any) {

    this._snackBar.openFromComponent(SnackBarComponent,
      {
        duration: (this.timeOut * 1000),
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition,
        data: value,
        panelClass: "error-snackbar"

      });


  }


  treeConceptoSeleccionado(value: any) {

    this._idConceptoSeleccion = value;

  }


  deleteConceptoSeleccionado(value: any) {

    this._conceptos = this._conceptos.filter((elemento) => elemento.id != value);

    if (this._conceptos.length > 0) {

      this._numConcepto = this._conceptos.length;
      this._idConceptoSeleccion = this._conceptos[this._numConcepto - 1]["id"];

    } else {
      this._numConcepto=1;
      this._idConceptoSeleccion=null;
    }
    this.actos.calcularSuplidos(this._dGenerales, this._conceptos);

  }



}
