import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WpxServicesService } from 'src/app/services/wpx-services.service';

@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.scss']
})
export class SearchGlobalComponent implements OnInit {


  @Input() SEARCH: any;
  @Output() okSearch = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef<HTMLElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  _displayStanard: string[] = ["CODIGO", "DESCRIPCION"];
  _searchStandard = new MatTableDataSource([]);


  @ViewChild(MatSort, { static: false })
  set sortSujetos(sort: MatSort) {
    this._searchStandard.sort = sort;

  }


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  _search: string = "";

  length = 0;
  pageSize = 10;
  totalCon = 0;


  constructor(public services: WpxServicesService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {

    this._searchStandard.sort = this.sortSujetos;
    this._searchStandard.paginator = this.paginator;

    console.log(this.sortSujetos);

    setTimeout(() => {
      this._search = "";
      this.search();
    });


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._searchStandard.filter = filterValue.trim().toLowerCase();

    if (this._searchStandard.paginator) {
      this._searchStandard.paginator.firstPage();
    }
  }



  confirm(obj: string): void {

    this.okSearch.emit(obj);

  }



  search(): void {

    let tablas;

    switch (this.SEARCH.text) {

      case "REGIMENECONOMICO":

        tablas = ({
          'tabla': 'REGIMENECONOMICO',
          'campo': '',
          'campossql': 'DESCRIPCIONREGIMENECONOMICO,CODIGOREGIMENECONOMICO',
          'noSQL': '',
          'where': 'IDIOMA=0',
          'order': 'CODIGOREGIMENECONOMICO',
          'group': ''
        });


        break;

      case "SEXO":

        tablas = ({
          'tabla': 'SEXOS',
          'campo': '',
          'campossql': 'DESCRIPCIONSEXO,CODIGOSEXO',
          'noSQL': '',
          'where': '',
          'order': 'CODIGOSEXO',
          'group': ''
        });


        break;



      case "ESTADOCIVIL":

        tablas = ({
          'tabla': 'ESTADOCIVIL',
          'campo': '',
          'campossql': 'DESCRIPCIONESTADOCIVIL,CODIGOESTADOCIVIL',
          'noSQL': '',
          'where': 'IDIOMA=0',
          'order': 'CODIGOESTADOCIVIL',
          'group': ''
        });


        break;

    }


    //console.log(this.SEARCH);




    this.services.getData(tablas).subscribe(data => {


      let datos = data.detail;


      switch (this.SEARCH.text) {

        case "REGIMENECONOMICO":
          datos.forEach((values: any, index: any) => {
            this._searchStandard.data.push({
              DESCRIPCION: values["DESCRIPCIONREGIMENECONOMICO"],
              CODIGO: values["CODIGOREGIMENECONOMICO"],
              SEARCH: this.SEARCH
            });

          });

          break;


        case "SEXO":
          datos.forEach((values: any, index: any) => {
            this._searchStandard.data.push({
              DESCRIPCION: values["DESCRIPCIONSEXO"],
              CODIGO: values["CODIGOSEXO"],
              SEARCH: this.SEARCH
            });

          });

          break;

          case "ESTADOCIVIL":
            datos.forEach((values: any, index: any) => {
              this._searchStandard.data.push({
                DESCRIPCION: values["DESCRIPCIONESTADOCIVIL"],
                CODIGO: values["CODIGOESTADOCIVIL"],
                SEARCH: this.SEARCH
              });
  
            });
  
            break;

      }

      this._searchStandard.paginator = this.paginator;
      this._searchStandard.sort = this.sortSujetos;

      this.totalCon = datos.length;;



    });




  }



}
