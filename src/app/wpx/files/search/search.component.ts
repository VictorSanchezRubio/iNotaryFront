import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Combobox } from 'src/app/class/combobox';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { GlobalFunctions } from 'src/app/global/global-functions';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GlobalConstant } from 'src/app/global/global-constant';
import { SearchSujeto } from '../../carpeta/carpeta/screens/comparecientes/comparecientes.component';
import { MatDialog } from '@angular/material/dialog';


export interface DialogDataNew {
  text: string;
  textOld: string;
  error: string;

}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SearchComponent implements OnInit, AfterViewInit {


  @Output() messageEvent = new EventEmitter<string[]>();
  @Output() protocoloEvent = new EventEmitter<string[]>();

  // @ViewChild(MatSort) sort: MatSort;
  //  @ViewChild(MatSort) sortC: MatSort;


  @ViewChild(MatPaginator) paginator: MatPaginator;


  // screen: string = "Search";

  /* ------ Autocomplete ------ */

  myControl = new FormControl({ disabled: false });
  myControlEncargados = new FormControl();
  myControlAsesores = new FormControl();
  myControlRegPropiedad = new FormControl();


  myControlNIF = new FormControl();
  myControlCINT = new FormControl({ disabled: false });

  filteredOptions: Observable<Combobox[]>;
  filteredOptionsEncargados: Observable<Combobox[]>;
  filteredOptionsAsesores: Observable<Combobox[]>;
  filteredOptionsRegPropiedad: Observable<Combobox[]>;


  filteredOptionsNIF: Observable<Combobox[]>;
  filteredOptionscInt: Observable<Combobox[]>;


  /* ----- Options Screen ----- */

  _color = "primary";

_toolTipNIF = "Valores con escacio --> Busca por cualquier de los valores; Valores con + --> Debe de cumplir los valores a buscar";

  /* ---- Options fields from screen option area = Protocolo is true ------ */

  _displayStanard: string[] = ["CODIGOPROTOCOLO", "FECHAPROTOCOLO", "LRO", "ENCARGADO", "DESCRIPCION", "ASESOR", "DOCUMENTO", "REFERENCIA", "FC"];
  _searchStandard = new MatTableDataSource([]);
  sortedData = new MatTableDataSource();

  _displayStanardC: string[] = ["CODIGOPROTOCOLO", "FECHAPROTOCOLO", "LRO", "DNI", "NOMBRE", "DESCRIPCION", "CI", "DOCUMENTO", "REFERENCIA", "FC"];
  _searchStandardC = new MatTableDataSource([]);



  @ViewChild(MatSort, { static: false })
  set sort(sort: MatSort) {
    this._searchStandard.sort = sort;

  }

  @ViewChild(MatSort, { static: false })
  set sortC(sort: MatSort) {
    this._searchStandardC.sort = sort;

  }


  /* --- Options Globals ----- */

  area: 'Comparecientes' | 'Fincas' | 'Protocolo' = 'Protocolo';
  _secciones: Combobox[] = [];

  _sinFecha: boolean = false;
  _protocolos: boolean = true;
  _expedientes: boolean = true;
  _polizas: boolean = true;
  _completo: boolean = false;
  _notario: string = "";



  _fechaI: Date;
  _fechaF: Date;
  minDate: Date;
  maxDate: Date;

  _notarios: Combobox[] = [];



  /* ---- Options from Pagination  ----- */

  length = 0;
  pageSize = 10;
  totalCon = 0;
  totalCom = 0;


  /* ----- Files form chek is Protocolo -----*/

  _numProtocolo: String = "";
  _seccion: String = "";
  _numLRO: String = "";
  _numRef: String = "";
  _acto: String = "";
  _encargado: String = "";
  _asesor: String = "";

  _encargados: Combobox[] = [];
  _asesores: Combobox[] = [];
  _notarioDef: String = "";
  _actos: Combobox[] = [];


  /* ----- Files form chek is Finca ----- */

  _registrosPropiedad: Combobox[] = [];
  _registroPropiedad: String = "";
  _refCatastral: String = "";
  _numFinca: String = "";
  _provincia: String = "";
  _poblacion: String = "";



  /* ------ Files form chck is Compareciente ----- */


  // _nif: Combobox[] = [];
  _cInt: Combobox[] = [];
  _soloPagadores: boolean = false;

  _nifC: String = "";
  _cIntC: String = "";



  /* ------------- Export ------------- */
  dadesExport;
  screen = "Search";
  filter;


  constructor(public services: WpxServicesService,
    private dbService: NgxIndexedDBService, public dialog: MatDialog) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear - 15, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);

    this._fechaI = new Date(currentYear - 1, currentMonth, currentDay);
    this._fechaF = new Date(currentYear, currentMonth, currentDay);

  }

  ngOnInit(): void {

    this.loadInit();



    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(viewValue => viewValue ? this._filter(viewValue) : this._actos.slice())
      );

    this.filteredOptionsEncargados = this.myControlEncargados.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(viewValue => viewValue ? this._filterEngargados(viewValue) : this._encargados.slice())
      );

    this.filteredOptionsAsesores = this.myControlAsesores.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(viewValue => viewValue ? this._filterAsesores(viewValue) : this._asesores.slice())
      );

    this.filteredOptionsRegPropiedad = this.myControlRegPropiedad.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(viewValue => viewValue ? this._filterRegPropiedad(viewValue) : this._registrosPropiedad.slice())
      );

    /*
        this.filteredOptionsNIF = this.myControlNIF.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.viewValue),
            map(viewValue => viewValue ? this._filterNIF(viewValue) : this._nif.slice())
          );
    */

    this.filteredOptionscInt = this.myControlCINT.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.viewValue),
        map(viewValue => viewValue ? this._filterCINT(viewValue) : this._cInt.slice())
      );



    //    this.filteredOptions .subscribe(value => console.log(value));

   // this.loadInit();


  }


  ngAfterViewInit() {

    this._searchStandard.sort = this.sort;
    this._searchStandard.paginator = this.paginator;

    this._searchStandardC.sort = this.sortC;
    this._searchStandardC.paginator = this.paginator;


  }

  
  loadInit(): void {

    let tablas = ({
      'tabla': 'NOTARIOS',
      'campo': '',
      'campossql': 'CODIGONOTARIO,NOMBRENOTARIO',
      'noSQL': 'notarios',
      'where': 'CODIGONOTARIO<>\'*\'',
      'order': 'CODIGONOTARIO',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._notarios.push({ value: values["CODIGONOTARIO"], viewValue: values["NOMBRENOTARIO"] });
        this.dbService.getByIndex("opcionesusuario", "opc_CODIGO", "NOTARIO").subscribe((valuesTable) => {
          this._notario = valuesTable["opc_VALOR"];
          this._notarioDef = valuesTable["opc_VALOR"];
        });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });


    tablas = ({
      'tabla': 'Far_cod_INDICEUNICO',
      'campo': '',
      'campossql': 'IndUnico_CODIGO,IndUnico_DESCRIPCION',
      'noSQL': '',
      'where': 'LENGTH(IndUnico_CODIGO)=4',
      'order': 'IndUnico_CODIGO',
      'group': ''
    });


    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._actos.push({ value: values["IndUnico_CODIGO"], viewValue: values["IndUnico_CODIGO"] + ' - ' + values["IndUnico_DESCRIPCION"] });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

    this._secciones.push({ value: "A", viewValue: "A" });
    this._secciones.push({ value: "B", viewValue: "B" });


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
        this._encargados.push({ value: values["CODIGOEMPLEADO"], viewValue: values["CODIGOEMPLEADO"] + ' - ' + values["NOMBREEMPLEADO"] });
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


    tablas = ({
      'tabla': 'venus_dat_REGPROPIEDAD',
      'campo': '',
      'campossql': 'regpropiedad_CODIGO,regpropiedad_DESCRIPCION',
      'noSQL': '',
      'where': '',
      'order': 'regpropiedad_CODIGO',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._registrosPropiedad.push({ value: values["regpropiedad_CODIGO"], viewValue: values["regpropiedad_CODIGO"] + ' - ' + values["regpropiedad_DESCRIPCION"] });
      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

    let result;

    tablas = ({
      'tabla': 'far_cod_actosparametrizacion',
      'campo': '',
      'campossql': 'paramacto_C1',
      'noSQL': '',
      'where': "paramacto_C1<>''",
      'order': 'paramacto_C1',
      'group': 'paramacto_C1'
    });

    this.services.getData(tablas).subscribe(data => {
      data.detail.forEach((values: any, index: any) => {
        this._cInt.push({ value: values["paramacto_C1"], viewValue: values["paramacto_C1"] });
      });

      tablas = ({
        'tabla': 'far_cod_actosparametrizacion',
        'campo': '',
        'campossql': 'paramacto_C2',
        'noSQL': '',
        'where': "paramacto_C2<>''",
        'order': 'paramacto_C2',
        'group': 'paramacto_C2'
      });

      this.services.getData(tablas).subscribe(data => {
        data.detail.forEach((values: any, index: any) => {
          this._cInt.push({ value: values["paramacto_C2"], viewValue: values["paramacto_C2"] });
        });

        tablas = ({
          'tabla': 'far_cod_actosparametrizacion',
          'campo': '',
          'campossql': 'paramacto_C3',
          'noSQL': '',
          'where': "paramacto_C3<>''",
          'order': 'paramacto_C3',
          'group': 'paramacto_C3'
        });

        this.services.getData(tablas).subscribe(data => {
          data.detail.forEach((values: any, index: any) => {
            this._cInt.push({ value: values["paramacto_C3"], viewValue: values["paramacto_C3"] });
          });

          tablas = ({
            'tabla': 'far_cod_actosparametrizacion',
            'campo': '',
            'campossql': 'paramacto_C4',
            'noSQL': '',
            'where': "paramacto_C4<>''",
            'order': 'paramacto_C4',
            'group': 'paramacto_C4'
          });

          this.services.getData(tablas).subscribe(data => {
            data.detail.forEach((values: any, index: any) => {
              this._cInt.push({ value: values["paramacto_C4"], viewValue: values["paramacto_C4"] });
            });



            result = GlobalFunctions.removeDuplicates(this._cInt, "viewValue");

            this._cInt = result;
            this._cInt.sort(function (a, b) {
              if (a.value > b.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              return 0;
            });

            this.search();

          }, error => {
            alert(error.status + " " + error.statusText);
            console.error(error.status + " " + error.statusText);
          });


        }, error => {
          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });

      }, error => {
        alert(error.status + " " + error.statusText);
        console.error(error.status + " " + error.statusText);
      });


    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

    /*
        tablas = ({
          'tabla': 'far_cod_actosparametrizacion',
          'campo': '',
          'campossql': 'paramacto_C2',
          'noSQL': '',
          'where': "paramacto_C2<>''",
          'order': 'paramacto_C2',
          'group': 'paramacto_C2'
        });
    
        this.services.getData(tablas).subscribe(data => {
          data.detail.forEach((values: any, index: any) => {
            this._cInt.push({ value: values["paramacto_C2"], viewValue: values["paramacto_C2"] });
          });
    
        }, error => {
          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });
    */
    /*
        tablas = ({
          'tabla': 'far_cod_actosparametrizacion',
          'campo': '',
          'campossql': 'paramacto_C3',
          'noSQL': '',
          'where': "paramacto_C3<>''",
          'order': 'paramacto_C3',
          'group': 'paramacto_C3'
        });
    
        this.services.getData(tablas).subscribe(data => {
          data.detail.forEach((values: any, index: any) => {
            this._cInt.push({ value: values["paramacto_C3"], viewValue: values["paramacto_C3"] });
          });
    
        }, error => {
          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });
    
    */
    /*
        tablas = ({
          'tabla': 'far_cod_actosparametrizacion',
          'campo': '',
          'campossql': 'paramacto_C4',
          'noSQL': '',
          'where': "paramacto_C4<>''",
          'order': 'paramacto_C4',
          'group': 'paramacto_C4'
        });
    
        this.services.getData(tablas).subscribe(data => {
          data.detail.forEach((values: any, index: any) => {
            this._cInt.push({ value: values["paramacto_C4"], viewValue: values["paramacto_C4"] });
    
          });
    
        }, error => {
          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });
    */
    /*
        let result;
    
        setTimeout(() => {
    
          result = GlobalFunctions.removeDuplicates(this._cInt, "viewValue");
    
          this._cInt = result;
          this._cInt.sort(function (a, b) {
            if (a.value > b.value) {
              return 1;
            }
            if (a.value < b.value) {
              return -1;
            }
            return 0;
          });
    
    
          //console.log((this._cInt));
    
        }, 5000);
    */

    /*
        tablas = ({
          'tabla': 'SUJETOS',
          'campo': '',
          'campossql': 'DNI, NOMBRE, PRIMERAPELLIDO, SEGUNDOAPELLIDO',
          'noSQL': '',
          'where': '',
          'order': 'DNI',
          'group': ''
        });
    
        this.services.getData(tablas).subscribe(data => {
          data.detail.forEach((values: any, index: any) => {
            this._nif.push({ value: values["DNI"], viewValue: values["DNI"] + " - " + (values["NOMBRE"] == null ? "" : values["NOMBRE"]) + " " + (values["PRIMERAPELLIDO"] == null ? "" : values["PRIMERAPELLIDO"]) + " " + (values["SEGUNDOAPELLIDO"] == null ? "" : values["SEGUNDOAPELLIDO"]) });
          });
    
        }, error => {
          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });
    
    */

  }


  NewProtocolo(): void {

    let label: any = GlobalFunctions.newGuid();
    let component = "CarpetaComponent";
    let app = "app-carpeta";
    let screen = "";
    let parent = "home";
    let activeLinkIndex = "";

    this.protocoloEvent.emit([activeLinkIndex,
      "/" + parent + "/" + screen,
      label,
      './' + screen,
      parent,
      component,
      app,
      '']);

  }


  openProtocolo(obj): void {


    let label: any = obj["CODIGOPROTOCOLO"]; // GlobalFunctions.newGuid();
    let component = "CarpetaComponent";
    let app = "app-carpeta";
    let screen = "";
    let parent = "home";
    let activeLinkIndex = "";
    let tramite: any = obj["CODIGOPROTOCOLO"];


    if (label.charAt(0) == "C") {
      label = obj["LRO"];
    }


    this.protocoloEvent.emit([activeLinkIndex,
      "/" + parent + "/" + screen,
      label,
      './' + screen,
      parent,
      component,
      app,
      tramite]);

  }


  openFichaContable(obj): void {


    let label: any = "F.C." + obj["CODIGOPROTOCOLO"]; // GlobalFunctions.newGuid();
    let component = "FichacontableComponent";
    let app = "app-fichacontable";
    let screen = "";
    let parent = "home";
    let activeLinkIndex = "";
    let tramite: any = obj["CODIGOPROTOCOLO"];


    if (label.charAt(0) == "C") {
      label = obj["LRO"];
    }


    this.protocoloEvent.emit([activeLinkIndex,
      "/" + parent + "/" + screen,
      label,
      './' + screen,
      parent,
      component,
      app,
      tramite]);

  }


  search(): any {


    // console.log(this.myControl.value.value);

    let _notaria = this._notarios.find(x => x.value == this._notario);

    let _nacto: string = "";

    let _ndni: string = "";
    let _contintC: string = "";

    if (this.myControl.value != null) {
      if (this.myControl.value.value != undefined) {
        if (this.myControl.value.value != "") {
          _nacto = this.myControl.value + " - " + this._actos.find(x => x.value == (this.myControl.value == null ? "" : (this.myControl.value.value == undefined ? "" : this.myControl.value.value))).viewValue;
        }
      }
    }
    /*
        if (this.myControlNIF.value != null) {
          if (this.myControlNIF.value.value != undefined) {
            if (this.myControlNIF.value.value != "") {
              _ndni = this._nif.find(x => x.value == (this.myControlNIF.value == null ? "" : (this.myControlNIF.value.value == undefined ? "" : this.myControlNIF.value.value))).viewValue;
            }
          }
        }
    */
    if (!this.myControlCINT.disabled) {
      if (this.myControlCINT.value != null) {
        if (this.myControlCINT.value.value != undefined) {
          if (this.myControlCINT.value.value != "") {
            _contintC = this._cInt.find(x => x.value == (this.myControlCINT.value == null ? "" : (this.myControlCINT.value.value == undefined ? "" : this.myControlCINT.value.value))).viewValue;
          }
        }
      }
    }

    let auxnifC = "";
    if (this._nifC != "") {

      auxnifC = this._nifC.split(" - ")[0];


    }


    const searchOptions = {

      notario: this._notario,
      notaria: _notaria.viewValue,
      area: this.area,
      fechaI: this._fechaI,
      fechaF: this._fechaF,
      protocolo: (this._protocolos == true ? "Y" : "N"),
      expediente: (this._expedientes == true ? "Y" : "N"),
      poliza: (this._polizas == true ? "Y" : "N"),
      completo: (this._completo == true ? "Y" : "N"),
      sinfecha: (this._sinFecha == true ? "Y" : "N"),
      numProtocolo: this._numProtocolo,
      seccion: this._seccion,
      lro: this._numLRO,
      ref: this._numRef,
      acto: (this.myControl.value == null ? "" : (this.myControl.value.value == undefined ? "" : this.myControl.value.value)),
      nacto: _nacto,
      encargado: (this.myControlEncargados.value == null ? "" : (this.myControlEncargados.value.value == undefined ? "" : this.myControlEncargados.value.value)),
      asesor: (this.myControlAsesores.value == null ? "" : (this.myControlAsesores.value.value == undefined ? "" : this.myControlAsesores.value.value)),
      regPropiedad: (this.myControlRegPropiedad.value == null ? "" : (this.myControlRegPropiedad.value.value == undefined ? "" : this.myControlRegPropiedad.value.value)),
      refcatastral: this._refCatastral,
      numfinca: this._numFinca,
      provincia: this._provincia,
      poblacion: this._poblacion,

      dni: auxnifC, // (this.myControlNIF.value == null ? "" : (this.myControlNIF.value.value == undefined ? "" : this.myControlNIF.value.value)),
      dniC: _ndni,
      contint: (this._soloPagadores == true ? "" : (this.myControlCINT.value == null ? "" : (this.myControlCINT.value.value == undefined ? "" : this.myControlCINT.value.value))),
      contintC: _contintC,
      solpag: (this._soloPagadores == true ? "Y" : "N"),
      user: GlobalConstant.userLogin,

    }

    this.filter = searchOptions;

    this.services.loadSearch(searchOptions).subscribe(data => {
      //console.info(data.detail);
      let datos = data.detail;


      this._searchStandard = null;
      this._searchStandardC = null;

      this.totalCon = 0;
      this.totalCom = 0;

      this.dadesExport = datos;

      if (this.area === "Protocolo" || this.area === "Fincas") {

        this._searchStandard = new MatTableDataSource(datos);
        this._searchStandard.paginator = this.paginator;

        this.length = datos.length;
        this._searchStandard.sort = this.sort;
        this.totalCon = datos.length;



      } else {

        this._searchStandardC = new MatTableDataSource(datos);
        this._searchStandardC.paginator = this.paginator;

        this.length = datos.length;
        this._searchStandardC.sort = this.sortC;
        this.totalCom = datos.length;




      }


    }, error => {

      console.error(error);


    });

  }


  transformProtocolo(event: any): void {

    if (this._notarioDef === "") {
      alert("No tiene establecido 'Notario por Defecto'");
      return;
    }
    this._numProtocolo = GlobalFunctions.tranformProtocolo(event.target.value, this._notarioDef);
  }


  transformPoliza(event: any): void {

    this._numLRO = GlobalFunctions.tranformPoliza(event.target.value);
  }


  private _filter(viewValue: string): Combobox[] {
    const filterValue = viewValue.toLowerCase();
    return this._actos.filter(acto => acto.viewValue.toLowerCase().includes(filterValue));
  }

  displayFn(value: Combobox): string {
    return value && value.viewValue ? value.viewValue : '';
  }

  private _filterEngargados(viewValue: string): Combobox[] {
    const filterValue = viewValue.toLowerCase();
    return this._encargados.filter(encargado => encargado.viewValue.toLowerCase().includes(filterValue));
  }

  private _filterAsesores(viewValue: string): Combobox[] {
    const filterValue = viewValue.toLowerCase();
    return this._asesores.filter(asesor => asesor.viewValue.toLowerCase().includes(filterValue));
  }

  private _filterRegPropiedad(viewValue: string): Combobox[] {
    const filterValue = viewValue.toLowerCase();
    return this._registrosPropiedad.filter(regprop => regprop.viewValue.toLowerCase().includes(filterValue));
  }
  /*
    private _filterNIF(viewValue: string): Combobox[] {
      const filterValue = viewValue.toLowerCase();
      return this._nif.filter(nif => nif.viewValue.toLowerCase().includes(filterValue));
    }
  */
  private _filterCINT(viewValue: string): Combobox[] {
    const filterValue = viewValue.toLowerCase();
    return this._cInt.filter(cint => cint.viewValue.toLowerCase().includes(filterValue));
  }


  soloPagadores(): void {


    if (this._soloPagadores == true) {
      this.myControlCINT.disable();
    } else {
      this.myControlCINT.enable();
    }

  }





  searchSujeto(): void {


    const dialogoRef = this.dialog.open(SearchSujeto, {
      width: '850px',
      height: '800px',
      data: {
        text: this._nifC,
        textOld: this._nifC
      }
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        if (result.text != "") {
          this._nifC = result.DNI + " - " + result.NOMBRE + " " + result.PRIMERAPELLIDO + " " + result.SEGUNDOAPELLIDO;

          /**
           * Buscar datos Sujeto.
           */
        }
      }
    })

  }



  onAceptarSujeto(): void {

    /*
    
        if (this.DNI!=="" && (this.comparecientes_NOMBRE!=="" || this.comparecientes_PRIMERAPELLIDO==="")) {
          this.comparecientes.push(this.DNI);
          this.borrarValores();
          }
    */
  }








  /*
  exportDades():void {
  
  
  
    const tmp = {
                  type:"PDF",
                  area:"Search"
                };
  
    
  
  
  
  
  }
  */

  /*
    sortData(sort: Sort) {
      const data = this._displayStanard.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }
  
      this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'calories': return compare(a.calories, b.calories, isAsc);
          case 'fat': return compare(a.fat, b.fat, isAsc);
          case 'carbs': return compare(a.carbs, b.carbs, isAsc);
          case 'protein': return compare(a.protein, b.protein, isAsc);
          default: return 0;
        }
      });
    }
  */










}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




