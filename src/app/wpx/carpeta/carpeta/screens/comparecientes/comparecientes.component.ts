import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Combobox } from 'src/app/class/combobox';
import { Comparecientes } from 'src/app/interfaces/carpeta/comparecientes';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { SnackBarComponent } from 'src/app/wpx/helper/snack-bar/snack-bar.component';


export interface DialogDataNew {
  text: string;
  textOld: string;
  error: string;

}


export interface DialogGlobal {
  text: string;
  label: string;

}


@Component({
  selector: 'app-comparecientes',
  templateUrl: './comparecientes.component.html',
  styleUrls: ['./comparecientes.component.scss']
})
export class ComparecientesComponent implements OnInit {

  @Input() comparecientes: any;


  _color = "primary";

  _compareciente: Comparecientes;

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


  SEXO?: string;
  FAX?: string;

  TELEFONO?: string;
  EMAIL?: string;
  sujetos_MOVIL?: string;

  sujetos_TIPOIDE: string;

  isNew: boolean = true;

  _sujetos_TIPOIDE: Combobox[] = [];


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private dialog: MatDialog,
    private services: WpxServicesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.comparecientes = []; // ['Edu', 'David', 'Marta'];
    this.borrarValores();


    let tablas = ({
      'tabla': 'far_cod_TIPOSDOCSIDE_ANCERT',
      'campo': '',
      'campossql': 'tipoID_CODIGO,tipoID_DESCRIPCION',
      'noSQL': 'tiposide',
      'where': '',
      'order': 'tipoID_CODIGO',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._sujetos_TIPOIDE.push({ value: values["tipoID_CODIGO"], viewValue: values["tipoID_CODIGO"] + " - " + values["tipoID_DESCRIPCION"] });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });




  }


  borrarValores() {

    this.DNI = "";

    this.comparecientes_NOMBRE = "";
    this.comparecientes_PRIMERAPELLIDO = "";
    this.comparecientes_SEGUNDOAPELLIDO = "";

    this.CONCEPTOINTERVENCION = "";
    this.VIA = "";
    this.DOMICILIO = "";
    this.NUMERO = "";
    this.CODIGOPOSTAL = "";

    this.MUNICIPIO = "";
    this.PEDANIAOBARRIO = "";
    this.PROVINCIA = "";
    this.BIS = false;
    this.PUERTA = "";
    this.BLOQUE = "";
    this.ESCALERA = "";
    this.PAIS = "";

    this.ESTADOCIVIL = "";
    this.comparecientes_NACIONALIDAD = "";
    this.comparecientes_REGIMENECONOMICO = "";

    this.APROXPOSTAL = "";
    this.comparecientes_RESTODIRECCION = "";
    this.comparecientes_PROFESION = "";

    this.comparecientes_CLASE = "";
    this.comparecientes_TIPOCOMPARECENCIA = "";
    this.comparecientes_PRESENCIA = "";
    this.PISO = "";
    this.comparecientes_CLASEINTERVENCION = "";
    this.comparecientes_TIPOAFECTADO = "";

    this.comparecientes_ENTIDADBANCARIA = "";

    this.comparecientes_PROFAPODERADO = "";
    this.comparecientes_TIPOPARENTESCO = "";
    this.comparecientes_PARIENTE = "";
    this.comparecientes_CLASECARGO = "";
    this.comparecientes_TIPOCARGO = "";

    this.comparecientes_REPARTO = "";


    this.SEXO = "";
    this.FAX = "";

    this.TELEFONO = "";
    this.EMAIL = "";
    this.sujetos_MOVIL = "";

    this.sujetos_TIPOIDE = "";

  }

  //comparecientes = []; // ['Edu', 'David', 'Marta'];



  onDrop(event: CdkDragDrop<string[]>) {
    //    this.ss.drop(event);

    console.log(event);

  }


  search(): void {


    const dialogoRef = this.dialog.open(SearchSujeto, {
      width: '850px',
      height: '800px',
      data: {
        text: this.DNI,
        textOld: this.DNI
      }
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        if (result.text != "") {
          this.DNI = result.DNI;

          /**
           * Buscar datos Sujeto.
           */
        }
      }
    })

  }




  searchGlobal(option: string, label: string): void {

    const dialogoRef = this.dialog.open(SearchGlobalComparecientes, {
      width: '850px',
      height: '800px',
      data: {
        text: option,
        label: label
      }
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        if (result.CODIGO != "") {

          switch (result.SEARCH.text) {

            case "REGIMENECONOMICO":
              this.comparecientes_REGIMENECONOMICO = result.CODIGO;
              break;

            case "SEXO":
              this.SEXO = result.CODIGO;
              break;

            case "ESTADOCIVIL":
              this.ESTADOCIVIL = result.CODIGO;
              break;

          }


          // this.DNI = result.DNI;

          /**
           * Buscar datos Sujeto.
           */
        }
      }
    })

  }



  onAceptarSujeto(): void {

    if (this.sujetos_TIPOIDE === "") {
      this._snackBar.openFromComponent(SnackBarComponent,
        {
          // duration: (this.timeOut * 1000),//
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          data: "Indique el tipo de Identificación",
          panelClass: 'error-snackbar-red'
        });

      
    } 

    if (this.DNI !== "" && (this.comparecientes_NOMBRE !== "" || this.comparecientes_PRIMERAPELLIDO === "") && this.sujetos_TIPOIDE !== "") {
      this.comparecientes.push(this.DNI);
      this.borrarValores();
      this.isNew = !this.isNew;
    }



  }


}



@Component({
  selector: "search-sujeto",
  templateUrl: 'dialogs/search-sujeto.html',
  styleUrls: ['./dialogs/search-sujeto.scss']

})
export class SearchSujeto {

  constructor(
    public dialogRef: MatDialogRef<SearchSujeto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNew
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }


  aceptarSujeto(event: any) {

    this.dialogRef.close(event);

  }

};



@Component({
  selector: "search-global",
  templateUrl: 'dialogs/search-global.html',
  styleUrls: ['./dialogs/search-global.scss']

})
export class SearchGlobalComparecientes {

  constructor(
    public dialogRef: MatDialogRef<SearchGlobalComparecientes>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGlobal
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }


  aceptar(event: any) {

    this.dialogRef.close(event);

  }

};

