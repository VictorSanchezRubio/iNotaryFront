import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { WpxServicesIndexDBService } from 'src/app/services/wpx-services-index-db.service';
import { GlobalConstant } from 'src/app/global/global-constant';
import { GlobalFunctions } from 'src/app/global/global-functions';


import { SearchComponent } from 'src/app/wpx/files/search/search.component';
import { FueraprotocoloComponent } from 'src/app/wpx/invoices/fueraprotocolo/fueraprotocolo.component';

import { FormControl } from '@angular/forms';
import { CarpetaComponent } from '../../carpeta/carpeta/carpeta.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  @Input() protocolo: string;




  selected = new FormControl(0);


  navLinks: any[];
  activeLinkIndex = -1;
  background = 'indigo';


  progressbarValue = 0;
  curSec: number = 0;

  tablasMemoria: any[] = [];

  constructor(private router: Router,
    public services: WpxServicesService,
    public servicesIDB: WpxServicesIndexDBService
  ) {

    this.navLinks = [];
    this.activeLinkIndex = -1;

  }


  ngOnInit(): void {

    this.router.events.subscribe((res) => {
      if (res["url"] != undefined) {

        let urlArray = res["url"].split("/");
        let url = "./" + urlArray[urlArray.length - 1];
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === url));
      }

    });
    this.loadInitial();
  }


  reciveFromHome($event): any {

    let exists = false;

    this.navLinks.forEach((element, index) => {

      if (element.label === $event[2]) {
        exists = true;
        this.activeLinkIndex = index;
        return true;

      };

    });

    if (!exists) {

      let componentTmp: any;

      switch ($event[5]) {

        case "SearchComponent":
          componentTmp = SearchComponent;
          break;

        case "FueraprotocoloComponent":
          componentTmp = FueraprotocoloComponent;
          break;

        case "CarpetaComponent":
          componentTmp = CarpetaComponent;
          break;


      }

      this.navLinks.push({
        label: $event[2],
        link: $event[3],
        index: this.navLinks.length,
        parent: $event[4],
        navigate: $event[1],
        id: GlobalFunctions.newGuid(),
        component: componentTmp,
        app: $event[6],
        tramite: $event[7]
      });

      this.activeLinkIndex = this.navLinks.length - 1;
      this.selected.setValue(this.activeLinkIndex);

    } else {

      alert("Pantalla ya activa")
      this.selected.setValue(this.activeLinkIndex);

    }
  }

  closeTab($event): any {

    if ($event === 0) {

      if (this.navLinks.length > 1) {

        this.activeLinkIndex = 1;
      }

    } else {

      this.activeLinkIndex = 0;

    }


    // this.navLinks.splice($event, 1);

    this.navLinks = this.navLinks.filter(function (e) { return e.id != $event; });

    //    this.navLinks = this.navLinks.filter(function (e) { return e != null; });

    if (this.navLinks.length != 0) {

      this.activeLinkIndex = 0;
      this.selected.setValue(0);

    } else {
      this.navLinks = [];
      this.activeLinkIndex = -1;
      this.selected.setValue(0);
    }

  }

  loadInitial(): void {

    this.tablasMemoria.push({
      tabla: 'far_cod_TIPOSDOCSIDE_ANCERT',
      campo: 'tipoID_Version',
      campossql: 'tipoID_CODIGO,tipoID_DESCRIPCION,tipoID_TIPOPERSONA',
      noSQL: 'tipoidentificacion',
      where: '',
      order: 'tipoID_CODIGO'
    });

    this.tablasMemoria.push({
      'tabla': 'CONCEPTOSDEINT',
      'campo': 'CINT_Version',
      'campossql': 'CODIGOCONCEPTODEINT,DESCRIPCIONCONCEPTODEINT,CODIGOINDICEDISCO',
      'noSQL': 'conceptosintervencion',
      'where': 'CODIGOCONCEPTODEINT like \'z__\'',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'venus_cod_PAISES',
      'campo': 'paises_Version',
      'campossql': 'CODIGO,DESCRIPCION',
      'noSQL': 'nacionalidad',
      'where': '',
      'order': 'DESCRIPCION ASC'
    });

    this.tablasMemoria.push({
      'tabla': 'far_cod_PROFESION',
      'campo': 'profesion_Version',
      'campossql': 'profesion_CODIGO,profesion_DESCRIPCION',
      'noSQL': 'profesion',
      'where': '',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'REGIMENECONOMICO',
      'campo': 'RE_Version',
      'campossql': 'CODIGOREGIMENECONOMICO,DESCRIPCIONREGIMENECONOMICO,IDIOMA',
      'noSQL': 'regimeneconomico',
      'where': '',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'SEXOS',
      'campo': 'S_Version',
      'campossql': 'CODIGOSEXO,DESCRIPCIONSEXO',
      'noSQL': 'sexo',
      'where': '',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'ESTADOCIVIL',
      'campo': 'EC_Version',
      'campossql': 'CODIGOESTADOCIVIL,DESCRIPCIONESTADOCIVIL,IDIOMA',
      'noSQL': 'estadocivil',
      'where': '',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'venus_cod_PAISES',
      'campo': 'paises_Version',
      'campossql': 'CODIGO,DESCRIPCION',
      'noSQL': 'paises',
      'where': '',
      'order': 'DESCRIPCION ASC'
    });

    this.tablasMemoria.push({
      'tabla': 'far_cod_CLASEINTERVENCION',
      'campo': 'version',
      'campossql': 'claseint_CODIGO,claseint_DESCRIPCION',
      'noSQL': 'tipointervencion',
      'where': '',
      'order': ''
    });


    this.tablasMemoria.push({
      'tabla': 'far_cod_TIPOCOMPARECENCIA',
      'campo': 'version',
      'campossql': 'tipocomp_CODIGO,tipocomp_DESCRIPCION',
      'noSQL': 'tipocomparecencia',
      'where': '',
      'order': ''
    });


    this.tablasMemoria.push({
      'tabla': 'far_cod_PRESENCIAYREPRESENTACION',
      'campo': 'version',
      'campossql': 'prerep_CODIGO,prerep_DESCRIPCION',
      'noSQL': 'presenciarepresentacion',
      'where': '',
      'order': ''
    });


    this.tablasMemoria.push({
      'tabla': 'clases_intervencion',
      'campo': 'version',
      'campossql': 'id,descripcion',
      'noSQL': 'clasesintervencion',
      'where': '',
      'order': ''
    });


    this.tablasMemoria.push({
      'tabla': 'far_cod_grupoactividades',
      'campo': 'version',
      'campossql': 'GR_CODIGO2,DESCRIPCION',
      'noSQL': 'grupoactividadesPF',
      'where': 'GR_CODIGO2<>0 and TIPO_PERSONA=1',
      'order': 'ORDEN'
    });


    this.tablasMemoria.push({
      'tabla': 'far_cod_grupoactividades',
      'campo': 'version',
      'campossql': 'GR_CODIGO2,DESCRIPCION',
      'noSQL': 'grupoactividadesPJ',
      'where': 'GR_CODIGO2<>0 and TIPO_PERSONA=2',
      'order': 'ORDEN'
    });


    this.tablasMemoria.push({
      'tabla': 'VENUS_CFG_CONFIGURACION',
      'campo': '',
      'campossql': 'configuracion_FECHA,configuracion_FOLIOS,configuracion_FOLIOSEXENTOS,configuracion_FOLIOSCOPIAS,configuracion_CARASVACIAS,configuracion_COPIASAUTORIZADAS,configuracion_COPIASSIMPLES,CONFIGURACION_FOLIOSCOPIASPARCIALES,configuracion_PORCENTAJEIVA,configuracion_PORCENTAJERETENCION,configuracion_MODELO140,cfg_CUENTACOBRO',
      'noSQL': 'cfgConfiguracion',
      'where': '',
      'order': ''
    });

    this.tablasMemoria.push({
      'tabla': 'venus_cod_TIPOFINCA',
      'campo': '',
      'campossql': 'tipofinca_CODIGO,tipofinca_DESCRIPCION',
      'noSQL': 'tipofinca',
      'where': '',
      'order': 'tipofinca_CODIGO'
    });


    this.tablasMemoria.push({
      'tabla': 'venus_cod_CODIFICACIONESGENERICAS',
      'campo': '',
      'campossql': 'codificacionesgenericas_CODIGO,codificacionesgenericas_DESCRIPCION',
      'noSQL': 'clasealteracioncatastral',
      'where': 'codificacionesgenericas_IDENTIFICADOR=\'CLASE_ALTERACION_CATASTRAL\'',
      'order': 'codificacionesgenericas_CODIGO'
    });

    this.tablasMemoria.push({
      'tabla': 'venus_cod_CODIFICACIONESGENERICAS',
      'campo': '',
      'campossql': 'codificacionesgenericas_CODIGO,codificacionesgenericas_DESCRIPCION',
      'noSQL': 'cumplimientoart50',
      'where': 'codificacionesgenericas_IDENTIFICADOR=\'CUMPLIMIENTO_ART50_LEY13$1996\'',
      'order': 'codificacionesgenericas_CODIGO'
    });

    this.tablasMemoria.push({
      'tabla': 'far_cod_ENTIDADTASADORA',
      'campo': '',
      'campossql': 'CODIGOENTIDAD,DESCRIPCIONENTIDAD',
      'noSQL': 'entidadtasadora',
      'where': '',
      'order': 'CODIGOENTIDAD'
    });


    this.tablasMemoria.push({
      'tabla': 'far_dat_OPCIONESUSUARIOS',
      'campo': '',
      'campossql': 'opc_CODIGO,opc_VALOR,opc_TIPO',
      'noSQL': 'opcionesusuario',
      'where': 'opc_USERNAME=\'' + GlobalConstant.userLogin + '\'',
      'order': 'opc_CODIGO'
    });


    this.tablasMemoria.push({
      'tabla': 'TURNOS',
      'campo': '',
      'campossql': 'CODIGOTURNO,DESCRIPCIONTURNO',
      'noSQL': 'turnos',
      'where': '',
      'order': 'CODIGOTURNO'
    });


    this.tablasMemoria.push({
      'tabla': 'IDIOMAS',
      'campo': '',
      'campossql': 'CODIGOIDIOMA,DESCRIPCIONIDIOMA',
      'noSQL': 'idiomas',
      'where': '',
      'order': 'CODIGOIDIOMA'
    });



    if (this.changeVersion()) {

      for (let index = 0; index < this.tablasMemoria.length; index++) {

        this.progressbarValue = (index + 1) * 100 / this.tablasMemoria.length;
        this.getData(this.tablasMemoria[index]);
      }

    } else {
      this.progressbarValue = 100;
    }


  }



  getData(keys: any[]): void {

    this.services.getData(keys).subscribe(data => {

      //      sessionStorage.setItem(keys["noSQL"], JSON.stringify(data.detail));
      this.servicesIDB.addAll(keys["noSQL"], data.detail);

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });


  };



  changeVersion(): boolean {

    let change = false;
    if (localStorage.getItem("WpxDB") != undefined) {

      this.services.loadVersion().subscribe(data => {

        console.log(data.detail[0]["version"]);

        if (data.detail[0]["version"] != localStorage.getItem("WpxDB")) {

          localStorage.setItem("WpxDB", data.detail[0]["version"]);
          change = true;

          for (let index = 0; index < this.tablasMemoria.length; index++) {
            this.servicesIDB.clearStoreName(this.tablasMemoria[index]["noSQL"]);
          }
          change = true;

        }

      }, error => {
        alert(error.status + " " + error.statusText);
        console.error(error.status + " " + error.statusText);
      });

    } else {

      localStorage.setItem("WpxDB", "1");
      change = true;

    }

    return change;

  }

  startTimer(seconds: number): void {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = sec * 100 / seconds; //100 - sec * 100 / seconds;

      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }



  reciveNumProtocolo($event): any {

    console.log($event);


    this.reciveFromHome($event);

  }









}
