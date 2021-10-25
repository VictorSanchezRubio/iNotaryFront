import { Component, Input, OnInit, Inject, LOCALE_ID, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/global/global-functions';
import { DatosGenerales } from 'src/app/interfaces/carpeta/datos-generales';

import { Suplidos } from 'src/app/interfaces/carpeta/suplidos';
import { formatNumber } from '@angular/common';
import { VSuplidos } from 'src/app/interfaces/carpeta/v-suplidos';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { Conceptos } from 'src/app/interfaces/carpeta/relations/conceptos';
import { timeout } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';



export interface DialogDataNew {
  text: string;
  textOld: string;
  error: string;

}

export interface DataConceptoProcedure {
  idConcepto: string;
  conceptos: any;
}




@Component({
  selector: 'app-actos',
  templateUrl: './actos.component.html',
  styleUrls: ['./actos.component.scss']
})
export class ActosComponent implements OnInit {

  @Input() suplidos: Suplidos[];
  @Input() dGenerales: DatosGenerales;
  @Input() conceptosAll: any;
  @Input() idConcepto: any;

  @Output() errorDG = new EventEmitter<string>();
  @Output() addConcepto = new EventEmitter<string>();



  _vSuplidos: VSuplidos[] = [];

  _dGeneralesTmp: any;


  _conceptos: any[] = [];


  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog,
    private services: WpxServicesService) { }

  ngOnInit(): void {

    //   console.warn(this.suplidos);


    setTimeout(() => {
      this.calcularSuplidos(this.dGenerales);
      this.loadConcepts();

    },500);

  }

  loadConcepts(): void {
    let tablas = ({
      'tabla': 'far_cod_INDICEUNICO',
      'campo': '',
      'campossql': 'indunico_CODIGO,indunico_DESCRIPCION',
      'noSQL': 'far_cod_INDICEUNICO',
      'where': "LENGTH(indunico_CODIGO)=4 and right(indunico_CODIGO,2)<>'00'",
      'order': 'indunico_CODIGO',
      'group': ''

    });

/*
   this.services.getData(tablas).subscribe(data => {
      this._conceptos = data.detail;

    }, error => {
      this.errorDG.emit("Error al cargar los conceptos");
      console.error(error);
    });
*/


this.services.getNewData(tablas).then(data => {
  this._conceptos = data.detail;

}, error => {
  this.errorDG.emit("Error al cargar los conceptos");
  console.error(error);
});


  }


  calcularHonorarios(auxSelect: any): void {

    //console.info(this.conceptosAll);

    //for (let bucle=0; bucle<3; bucle += 1) {

    
    auxSelect.VALORNUMERICO = GlobalFunctions.replaceAll(auxSelect.VALORNUMERICO,",",".");


    if (auxSelect.DESCRIPCIONCAMPODATOS == "REDUCCION") {

      if (auxSelect.VALORNUMERICO > 100) {
        this.errorDG.emit("El porcentaje no puede ser superior al 100%.\nEl porcentaje será cambiado al 100%");
        auxSelect.VALORNUMERICO = 100;
      }

    }

    this.conceptosAll.forEach(elementConcepto => {

      let honorarios = [];

      elementConcepto.estructura.forEach(element => {
        if (element.FORMULAEUROS == '' || element.FORMULAEUROS == element.VALORNUMERICO) {
          honorarios.push({ fieldFormula: element.DESCRIPCIONCAMPODATOS, value: element.VALORNUMERICO })
        }
      });

      elementConcepto.estructura.forEach(element => {

        if (element.FORMULAEUROS != '' && element.FORMULAEUROS != element.VALORNUMERICO) {
          let formula = element.FORMULAEUROS;

          try {
            honorarios.forEach(eFormulas => {
              formula = GlobalFunctions.replaceAll(formula, eFormulas.fieldFormula, eFormulas.value);
            });
            element.VALORNUMERICO = formatNumber(eval(formula), this.locale, '0.2-2');
          } catch (error) {
          }
        }
      });
    });

    setTimeout(() => {

      this.calcularSuplidos(this.dGenerales);
    }, 100); /* 3000 */

  }



  calcularSuplidos(_dGenerales: any, auxConceptosAll:any = null): void {

    // console.error(_dGenerales);

    let FIJO = 0;
    let IMPORTEREDUCCION = 0;
    let TOTALPOD = 0;
    let HONORARIOS = 0;

    console.log("conceptosAll");
    console.log(this.conceptosAll);

    if (auxConceptosAll!==null) {
      this.conceptosAll=auxConceptosAll;

    }

    this.conceptosAll.forEach(conceptoTmp => {

      conceptoTmp.estructura.forEach(element => {

        switch (element.DESCRIPCIONCAMPODATOS) {

          case "FIJO":
            FIJO = FIJO + parseFloat(element.VALORNUMERICO);
            break;

          case "IMPORTEREDUCCION":
            IMPORTEREDUCCION = IMPORTEREDUCCION + parseFloat(element.VALORNUMERICO);
            break;

          case "TOTALPOD":
            TOTALPOD = TOTALPOD + parseFloat(element.VALORNUMERICO);
            break;

          case "HONORARIOS":
            HONORARIOS = HONORARIOS + parseFloat(element.VALORNUMERICO);
            break;

        }

      });


    });


    let TA = 1;

    this._vSuplidos = [];


    this._vSuplidos.push({ id: 100, fieldFormula: "IMPORTEREDUCCION", value: IMPORTEREDUCCION });

    this._vSuplidos.push({ id: 200, fieldFormula: "veCAUTORIZADAS", value: _dGenerales.COPIASAUTORIZADAS });
    this._vSuplidos.push({ id: 300, fieldFormula: "veFOLIOSCOPIAS", value: _dGenerales.FOLIOSCOPIAS });

    this._vSuplidos.push({ id: 400, fieldFormula: "veCARASVACIAS", value: _dGenerales.CARASVACIAS });

    this._vSuplidos.push({ id: 500, fieldFormula: "HONORARIOS", value: HONORARIOS });
    this._vSuplidos.push({ id: 600, fieldFormula: "veFTELEMAT", value: _dGenerales.protocolos_FOLIOSTELEMATICOS });
    this._vSuplidos.push({ id: 700, fieldFormula: "veCTELEMAT", value: _dGenerales.protocolos_COPIASTELEMATICAS });

    this._vSuplidos.push({ id: 800, fieldFormula: "veCSIMPLES", value: _dGenerales.COPIASSIMPLES });
    this._vSuplidos.push({ id: 900, fieldFormula: "veCEDULAS", value: _dGenerales.protocolos_CEDULAS });

    this._vSuplidos.push({ id: 1000, fieldFormula: "veFOLIOS", value: _dGenerales.FOLIOS });
    this._vSuplidos.push({ id: 1100, fieldFormula: "TOTALPOD", value: TOTALPOD });

    this._vSuplidos.push({ id: 1200, fieldFormula: "veLEGIT", value: _dGenerales.protocolos_LEGITIMACIONES });
    this._vSuplidos.push({ id: 1300, fieldFormula: "veTESTI", value: _dGenerales.protocolos_TESTIMONIOS });
    this._vSuplidos.push({ id: 1400, fieldFormula: "veDILIG", value: _dGenerales.protocolos_DILIGENCIAS });

    this._vSuplidos.push({ id: 1500, fieldFormula: "FIJO", value: FIJO });

    this._vSuplidos.push({ id: 1600, fieldFormula: "TA", value: TA });

    //console.log(this._vSuplidos);


    /*
        copiasDG["veFOLIOS"]=($("#DGFOLIOS").val()==""?"0":$("#DGFOLIOS").val());
        copiasDG["veFOLIOSCOPIAS"]=($("#DGFOLIOSCOPIAS").val()==""?"0":$("#DGFOLIOSCOPIAS").val());
        copiasDG["veCARASVACIAS"]=($("#DGCARASVACIAS").val()==""?"0":$("#DGCARASVACIAS").val());
        copiasDG["veCAUTORIZADAS"]=($("#DGCOPIASAUTORIZADAS").val()==""?"0":$("#DGCOPIASAUTORIZADAS").val());
        copiasDG["veCSIMPLES"]=($("#DGCOPIASSIMPLES").val()==""?"0":$("#DGCOPIASSIMPLES").val());
        copiasDG["veFTELEMAT"]=($("#DGFOLIOSTELEMATICOS").val()==""?"0":$("#DGFOLIOSTELEMATICOS").val());
        copiasDG["veCTELEMAT"]=($("#DGTELEMATICASAUT").val()==""?"0":$("#DGTELEMATICASAUT").val());
      
      //	copiasDB["veFOLIOSCOPIAS"]=$("#DGTELEMATICASSIM").val();
      
      
        copiasDG["veLEGIT"]=($("#DGLEGITIMACIONES").val()==""?"0":$("#DGLEGITIMACIONES").val());
        copiasDG["veTESTI"]=($("#DGTESTIMONIOS").val()==""?"0":$("#DGTESTIMONIOS").val());
        copiasDG["veDILIG"]=($("#DGDILIGENCIAS").val()==""?"0":$("#DGDILIGENCIAS").val());
        copiasDG["veCEDULAS"]=($("#DGCEDULAS").val()==""?"0":$("#DGCEDULAS").val());
    */


    //  for (let bucle = 0; bucle < 3; bucle++) {

    this.suplidos.forEach(element => {

      if (element.MANUALOCALCULADO == "C") {

        let formula = element.FORMULAEUROS;

        if (formula) {
          try {
            //              console.info("----- FORMULA INICIAL ----");
            //              console.log(formula);

            this._vSuplidos.forEach(eFormulas => {

              //     console.info(" ------ CAMPOS ------");
              //     console.log(eFormulas.fieldFormula + " ---> " + eFormulas.value);

              formula = GlobalFunctions.replaceAll(formula, eFormulas.fieldFormula, eFormulas.value);

            });
            //       console.log(formula);
            element.VALORNUMERICO = formatNumber(eval(formula), this.locale, '0.2-2');

          } catch (error) {

          }

        }
      }

    });
    // }

  }

  eventEmitDoubleClick(event, auxSelect) {

    if (auxSelect.FORMULAEUROS != null) {

      if (auxSelect.MANUALOCALCULADO == "C") {
        auxSelect.MANUALOCALCULADO = "M";
      } else {
        auxSelect.MANUALOCALCULADO = "C";
        this.calcularSuplidos(this.dGenerales);
      }

    }

  }

  changeValues(): void {

    console.log(this.suplidos);

  }






  openCahngeLabel(event, auxSelect): void {

    const dialogoRef = this.dialog.open(ChangeLabelDialog, {
      width: '325px',
      height: '300px',
      data: {
        text: auxSelect.TEXTOPANTALLA,
        textOld: auxSelect.TEXTOPANTALLA
      }
    });

    dialogoRef.afterClosed().subscribe(result => {

      if (result !== undefined) {

        if (result.text != "") {
          auxSelect.TEXTOPANTALLA = result.text;
        }
      }
    })

  }


  openNewConceptProcedure(): void {

    const dialogoRef = this.dialog.open(addConcepto, {
      width: '600px',
      height: '750px',
      data: {
        idConcepto: "",
        conceptos: this._conceptos
      }
    });

    dialogoRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        this.addConcepto.emit(result);
        setTimeout(() => {

          this.calcularSuplidos(this.dGenerales);
        }, 100); /* 2000 */


      }

    })



  }


}


@Component({
  selector: "change-label-dialog",
  templateUrl: 'dialogs/change-label.html',
  styleUrls: ['./dialogs/change-label.scss']

})
export class ChangeLabelDialog {

  constructor(
    public dialogRef: MatDialogRef<ChangeLabelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNew
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

};


@Component({
  selector: "add-concepto-tramite",
  templateUrl: 'dialogs/add-concepto.html',
  styleUrls: ['./dialogs/add-concepto.scss']

})
export class addConcepto implements OnInit, AfterViewInit {

  @ViewChild("input") myInputField: ElementRef;

  _utilizarGrupos: string = "";

  _displayStanard: string[] = ["indunico_CODIGO", "indunico_DESCRIPCION"];
  _searchStandard = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<addConcepto>,
    @Inject(MAT_DIALOG_DATA) public data: DataConceptoProcedure,
    private dbService: NgxIndexedDBService,
    private services: WpxServicesService

  ) { }


  ngAfterViewInit() {
    console.log(this.myInputField.nativeElement);
    // this.myInputField.nativeElement.focus();
  }

  ngOnInit(): void {

    this.dbService.getByIndex("opcionesusuario", "opc_CODIGO", "UTILIZARGRUPOS").subscribe((valuesTable) => {
      this._utilizarGrupos = (valuesTable["opc_VALOR"] == "0" ? "N" : "S");
    });
    this._searchStandard = null;
    this._searchStandard = new MatTableDataSource(this.data.conceptos);

    // this.myInputField.nativeElement.focus();

  }

  onCancel(): void {
    this.dialogRef.close();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._searchStandard.filter = filterValue.trim().toLowerCase();
  }

}