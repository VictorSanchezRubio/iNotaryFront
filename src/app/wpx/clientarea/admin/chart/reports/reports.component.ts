import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import { Color, Label } from 'ng2-charts';

import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { GlobalValues } from './global-values';
import { Combobox } from 'src/app/class/combobox';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { GlobalFunctions } from 'src/app/global/global-functions';
import { GlobalConstant } from 'src/app/global/global-constant';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsComponent implements OnInit, AfterViewInit {


 
  @ViewChild(BaseChartDirective) private _chartScreen;

  _tipo: string;
  _escritura: string;
  _areaEscritura: string;
  _periodo: string;
  _anualidad: string;
  _chart: string;
  _chartApiladas: boolean = false;
  _chartDoughnut: boolean = false;
  _concepto: string;
  _byAnualidad: boolean = true;
  _topTen: string;
  _mes: string;
  _trimestre: string;
  _semestre: string;

  _fechaDesde: Date;
  _fechaHasta: Date;

  _escfac: string;
  _tipocliente: string;

  _grafica: boolean = true;
  _vDatos: boolean = true;

  dataTable = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: false }) 
  set sort (sort: MatSort) {
    this.dataTable.sort=sort;
  };
  
  
  // sort: MatSort;


  displayedColumnsTable: string[] = [];
  columnsToDisplayTable: string[] = [];

  dataTablePdf: string[] = [];
  _tooltips: string[] = [];

  hovering: boolean = false;

  barChartData: ChartDataSets[];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {};

  barChartOptionsDefault: ChartOptions = GlobalValues.barChartOptionsDefault;
  barChartOptionsBarApi: ChartOptions = GlobalValues.barChartOptionsBarApi;
  barChartOptionsSemiCircle: ChartOptions = GlobalValues.barChartOptionsSemiCircle;
  barChartOptionsCircle: ChartOptions = GlobalValues.barChartOptionsCircle;

  barChartColors: Color[] = [];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;


  conceptos: Combobox[] = GlobalValues.conceptos;
  tipos: Combobox[] = GlobalValues.tipos;
  escrituras: Combobox[] = GlobalValues.escrituras;
   areaEscrituras: Combobox[] = GlobalValues.areaEscrituras;

  periodo: Combobox[] = GlobalValues.periodo;
  anualidades: Combobox[] = GlobalValues.anualidades;
  charts: Combobox[] = GlobalValues.charts;
  topTen: Combobox[] = GlobalValues.topTen;
  meses: Combobox[] = GlobalValues.meses;
  trimestres: Combobox[] = GlobalValues.trimestres;
  semestres: Combobox[] = GlobalValues.semestres;
  escfacs: Combobox[] = GlobalValues.escfac;
  tiposcliente: Combobox[] = GlobalValues.tipocliente;

  minDate: Date;
  maxDate: Date;


  constructor(private servicesWpx: WpxServicesService) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void {

    this.dataTable.sort = this.sort;

    this._periodo = "ANU";
    this._anualidad = "5";
    this._chart = "BR";


  }

ngAfterViewInit() {
this.dataTable.sort=this.sort;
}

  public updateReport() {
    /*
        console.log(this._tipo);
        console.log(this._escritura);
        console.log(this._areaEscritura);
        console.log(this._periodo);
        console.log(this._anualidad);
        console.log(this._chart);
        console.log(this._chartApiladas);
        console.log(this._chartDoughnut);
    */
    if (this._tipo == undefined) {
      return;
    }

    if (this._tipo == "ES" && (this._escritura == undefined || this._areaEscritura == undefined || this._concepto == undefined)) {

      if (this._areaEscritura == 'CO' && this._concepto == undefined) {
        return;
      }

      if ((this._areaEscritura === "AS" || this._areaEscritura === "EM" || this._areaEscritura === "CL") && this._escfac == undefined) {
        return;
      }

      if (this._areaEscritura === "CL" && this._tipocliente == undefined) {
        return;
      }

    }

    if (this._periodo == undefined) {
      return;
    }

    if (this._anualidad == undefined) {
      return;
    }

    if (this._chart == undefined) {
      return;
    }

    if (this._topTen == undefined) {
      return;
    }


    let _titulo = "";
    let seleccion = '{"usr":"' + GlobalConstant.userLogin + '",';

    seleccion = seleccion + '"TIP":"' + this._tipo + '",';
    seleccion = seleccion + '"TF":"' + this._topTen + '",';

    var _line2 = "";
    var _line1 = "";
    switch (this._tipo) {

      case "ES":


        seleccion = seleccion + '"ESC":"' + this._escritura + '",';
        seleccion = seleccion + '"TIPESC":"' + this._areaEscritura + '",';

        _line1 = _line1 + " / " + GlobalFunctions.valuesCombobox(this.escrituras, this._escritura)[1] + " / "+ GlobalFunctions.valuesCombobox(this.areaEscrituras, this._areaEscritura)[1];

        if (this._areaEscritura === "CO") {

          seleccion = seleccion + '"CONCEP":"' + this._concepto + '",';
          _line2 = GlobalFunctions.valuesCombobox(this.conceptos, this._concepto)[1];

        }

        if (this._areaEscritura === "AS" || this._areaEscritura === "EM"  || this._areaEscritura === "CL") {
          seleccion = seleccion + '"ESCEUR":"' + this._escfac + '",';
          _line2 = GlobalFunctions.valuesCombobox(this.escfacs, this._escfac)[1];

        }
        
        if (this._areaEscritura === "CL" ) {
          seleccion = seleccion + '"TIPOCLI":"' + this._tipocliente + '",';
          _line2 = _line2 + " / " + GlobalFunctions.valuesCombobox(this.tiposcliente, this._tipocliente)[1] ;
        }
        break;

    }

    seleccion = seleccion + '"PER":"' + this._periodo + '",';
    switch (this._periodo) {

      case "MEN":
        seleccion = seleccion + '"MES":"' + this._mes + '",';
        break;

      case "TRI":
        seleccion = seleccion + '"TRI":"' + this._trimestre + '",';
        break;

      case "SEM":
        seleccion = seleccion + '"SEM":"' + this._semestre + '",';
        break;

      case "EFE":
        seleccion = seleccion + '"FDES":"' + this._fechaDesde.toUTCString() + '",';
        seleccion = seleccion + '"FHAS":"' + this._fechaHasta.toUTCString() + '",';
        break;

    }


    if (this._periodo === "EFE") {
      seleccion = seleccion + '"ANUAL":"0",';
    } else {
      seleccion = seleccion + '"ANUAL":"' + this._anualidad + '",';
    }
    seleccion = seleccion + '"CHART":"' + this._chart + (this._byAnualidad ? "" : "I") + '"';

    seleccion = seleccion + "}";

    switch (this._chart) {

      case "BR":
        this.barChartType = 'horizontalBar'; //'bar';
        if (this._chartApiladas) {
          this.barChartOptions = this.barChartOptionsBarApi;
        } else {
          this.barChartOptions = this.barChartOptionsDefault;
        }
        break;

      case "DO":
        this.barChartType = 'doughnut';
        if (this._chartDoughnut) {
          this.barChartOptions = this.barChartOptionsSemiCircle;
        } else {
          this.barChartOptions = this.barChartOptionsCircle;
        }
        break;

      case "PO":
        this.barChartType = 'polarArea';
        this.barChartOptions = this.barChartOptionsCircle;
        break;


    }


    var _tituloAux = GlobalFunctions.valuesCombobox(this.tipos, this._tipo)[1] + _line1;




    this.barChartOptions.title.text = [_tituloAux, _line2];
    this.barChartOptions.title.display = true;


    console.log(seleccion);

    
    this.servicesWpx.loadReport(seleccion)
      .subscribe(
        data => {
          let datos = data["detail"];
          // console.log(datos);
          this.barChartData = [];
          this.barChartLabels = [];
          this.barChartData = datos[0];
          // if (datos[0].length < 21) {
          this.barChartLabels = datos[2][0];
          //  }

          if (this._byAnualidad) {
            this._tooltips = datos[3][0];
          }

          this.dataTable = new MatTableDataSource; // datos[0];

          this.displayedColumnsTable = datos[2][0].slice();
          this.displayedColumnsTable.unshift("Titulo");


// console.log(datos[2][0].slice());

          if (this.displayedColumnsTable[0]!=="Titulo") {
            this.displayedColumnsTable.unshift("Titulo");
          }


          this.displayedColumnsTable.forEach((element,index) => {
            this.displayedColumnsTable[index]=element.toString();

          });



          this.columnsToDisplayTable = this.displayedColumnsTable;
          this.dataTable = datos[4];
          this.dataTablePdf = datos[5];

          this._chartScreen.refresh();

this.dataTable.sort= this.sort;
        }
      );


  }


  createPdf(): void {


    let doc = new jsPDF({
      format: "a4",
      unit: "mm",
      orientation: "l"
    });


    // gràfic si check

    //   if (this._grafica) {

    var DATA = document.getElementById("chartArea");

    if (DATA == undefined) {


      var img = new Image();

      img.src = 'assets/images/logo.png';
      DATA = img;


    } else {



      html2canvas(DATA).then(canvas => {


        doc.setFontSize(18);

        doc.text('Cuadro de Mando', 11, 8);
        doc.text('Notaría:' + GlobalConstant.nameNotaria, 11, 18);


        doc.setFontSize(11);
        doc.setTextColor(100);



        if (this._grafica) {

          let fileWidth = 288; //208;
          let fileHeight = canvas.height * fileWidth / canvas.width;

          const FILEURI = canvas.toDataURL('image/png');

          let position = 25;
          doc.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);


        }





        if (this._vDatos) {

          if (this._grafica) {

            doc.addPage(null, this._byAnualidad ? "p" : "l");

          }

          (doc as any).autoTable({
            head: [this.columnsToDisplayTable],
            body: this.dataTablePdf,
            theme: 'grid',
            didDrawCell: data => {
              //   console.log(data.column.index)
            }
          })


        }





        // Open PDF document in new tab
        //doc.output('dataurlnewwindow')

        // Download PDF document  

        var pageCount = doc.getNumberOfPages();

        // var  dateAux = new Date();
        const datepipe: DatePipe = new DatePipe('en-US')
        var dateAux = datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');

        for (var i = 0; i < pageCount; i++) {
          doc.setPage(i);



          if (doc.getCurrentPageInfo().pageContext.mediaBox.topRightX < 600) {

            // doc.text(doc.getCurrentPageInfo().pageNumber + "/" + pageCount, 11, 308);
            doc.text(doc.getCurrentPageInfo().pageNumber + "/" + pageCount, 150, 285);
            doc.text(dateAux.toString(), 10, 285);
          } else {


            //doc.text(doc.getCurrentPageInfo().pageNumber + "/" + pageCount, 11, 108);
            doc.text(doc.getCurrentPageInfo().pageNumber + "/" + pageCount, 230, 195);
            doc.text(dateAux.toString(), 10, 195);
          }



        }


        doc.save('table_' + GlobalFunctions.newGuid() + '.pdf');


      });


    }


  }

  exportexcel(): void {

    let fileName = 'ExcelSheet_' + GlobalFunctions.newGuid() + '.xlsx';

    let element = document.getElementById('myTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);


  }





}
