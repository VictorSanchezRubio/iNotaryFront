import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstant } from 'src/app/global/global-constant';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Combobox } from 'src/app/class/combobox';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';
import { GlobalFunctions } from 'src/app/global/global-functions';
// import { DialogDataNew } from 'src/app/interfaces/dialog-data-new';


export interface DialogDataNew {
  area: any;
  notario: string;
  subArea: any;
  poliza: any;
  fecha: any;
  newNumber: string;
  bis?: string;
  idioma?: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string[]>();

  public _isLoged = GlobalConstant._isLoged;
  public _user = GlobalConstant.nameLogin;

  public _typeUser = GlobalConstant.typeUser;

  _notarioSelección: string = "";


  _area: 'Protocolo' | 'Expediente' | 'Poliza';
  _subArea: 'Poliza' | 'Protocolo' = 'Protocolo';
  _poliza: 'B' | 'A' = 'A';



  _fecha: Date;

  _newNumber: string = "";



  activeLinkIndex = -1;

  constructor(private route: Router,
    public services: WpxServicesService,
    public dialog: MatDialog
  ) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this._fecha = new Date(currentYear, currentMonth, currentDay);

  }

  ngOnInit(): void {




  }


  newTab(screen: any, label: any, parent: any, component: any, app: any, tramite: any = "") {
    this.messageEvent.emit([this.activeLinkIndex.toString(),
    "/" + parent + "/" + screen,
      label,
    './' + screen,
      parent,
      component,
      app,
      tramite]);
  }


  logOut() {
    sessionStorage.setItem('access_token', null);
    sessionStorage.removeItem('access_token');

    const user = {
      user: GlobalConstant.userLogin
    };


    this._isLoged = false;
    GlobalConstant._isLoged = false;

    this.services.logout(user).subscribe(data => {

    });
    this.route.navigate([""]);

  }






  openNewProtocolo(): void {

    const dialogRefNewProtocol = this.dialog.open(DialogNewProtocol, {
      width: '500px',
      height: '700px',
      data: {
        area: this._area,
        subArea: this._subArea,
        poliza: this._poliza,
        fecha: this._fecha,
        newNumber: '',
        notario: '',
        bis: ''
      }
    });

    dialogRefNewProtocol.afterClosed().subscribe(result => {

      if (result !== undefined) {


        let type = "P";

        switch (result.area) {

          case "Protocolo":
            type = "P";
            break;

          case "Expediente":
            type = "E";
            break

          case "Poliza":
            type = "C";
            break;

        }

        let fechaAux = result.fecha.getFullYear() + "-" + (result.fecha.getMonth() < 9 ? "0" : "") + (result.fecha.getMonth() + 1) + "-" + (result.fecha.getDate() < 10 ? "0" : "") + result.fecha.getDate();

        const values = {

          notaria: result.notario,
          fecha: fechaAux,
          type: type,
          seccion: result.poliza,
          subType: result.subArea,
          bis: result.bis,
          numManual: result.newNumber,
          user: GlobalConstant.userLogin,
          idioma: result.idioma

        };

        this.services.newProtocol(values).subscribe(data => {

          let detail = data.detail;


          if (detail.error != "") {
            alert(detail.error);
            console.error(detail.error);

          } else {

            let label: any = detail.tramite; // GlobalFunctions.newGuid();
            let component = "CarpetaComponent";
            let app = "app-carpeta";
            let screen = "";
            let parent = "home";
            let activeLinkIndex = "";

            this.newTab(screen, 
                          label, 
                          parent, 
                          component, 
                          app,
                          label);

          }

        }, error => {

          alert(error.status + " " + error.statusText);
          console.error(error.status + " " + error.statusText);
        });

      }
    })

  }
}


@Component({
  selector: "new-protocol-dialog",
  templateUrl: 'dialogs/new-protocolo.html',
  styleUrls: ['./dialogs/new-protocol.scss']


})
export class DialogNewProtocol implements OnInit {

  _color = "primary";
  _notarios: Combobox[] = [];
  _notarioDef: string = "";

  _lastNumber: string = "";

  _bis: Combobox[] = [];


  constructor(public dialogRef: MatDialogRef<DialogNewProtocol>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNew,
    private services: WpxServicesService,
    private dbService: NgxIndexedDBService) {

  }

  ngOnInit(): void {

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
        this._notarios.push({ value: values["CODIGONOTARIO"], viewValue: values["NOMBRENOTARIO"] });

        this.dbService.getByIndex("opcionesusuario", "opc_CODIGO", "NOTARIO").subscribe((valuesTable) => {
          this.data.notario = valuesTable["opc_VALOR"];
          this._notarioDef = valuesTable["opc_VALOR"];
        });

        this.dbService.getByIndex("opcionesusuario", "opc_CODIGO", "CREARNUEVO").subscribe((valuesTable) => {

          switch (valuesTable["opc_VALOR"]) {
            case "E":
              this.data.area = "Expediente";
              break;

            case "C":
              this.data.area = "Poliza";
              break;

            case "P":
              this.data.area = "Protocolo";
              break;
          }


        });


        this.dbService.getByIndex("opcionesusuario", "opc_CODIGO", "IDIOMA").subscribe((valuesTable) => {

          this.data.idioma = valuesTable["opc_VALOR"]

        });

      });

    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

    setTimeout(() => {
      this.lastNumber();
      this._bis.push({ value: "B", viewValue: "Bis" });
      this._bis.push({ value: "T", viewValue: "Tris" });
    }, 1000);

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  lastNumber(): void {

    let type = "";
    switch (this.data.area) {

      case "Protocolo":
        type = "P";
        break;

      case "Expediente":
        type = "E";
        break

      case "Poliza":
        type = "C";
        break;

    }
    let fechaAux = "";

    try {
      fechaAux = this.data.fecha._d.getFullYear() + "-" + (this.data.fecha._d.getMonth() < 9 ? "0" : "") + (this.data.fecha._d.getMonth() + 1) + "-" + (this.data.fecha._d.getDate() < 10 ? "0" : "") + this.data.fecha._d.getDate();

    } catch (err)
    {
      fechaAux = this.data.fecha.getFullYear() + "-" + (this.data.fecha.getMonth() < 9 ? "0" : "") + (this.data.fecha.getMonth() + 1) + "-" + (this.data.fecha.getDate() < 10 ? "0" : "") + this.data.fecha.getDate();
    }

    

    let seleccion = '{"notaria":"' + this.data.notario + '", "fecha":"' + fechaAux + '", "type":"' + type + '","seccion":"' + this.data.poliza + '","bis":"' + this.data.bis + '"}';

    this.services.lastNumber(seleccion).subscribe(dataLN => {

      this._lastNumber = dataLN.detail[0].NUMERO;
      this.data.newNumber = dataLN.detail[0].NEWNUMBER;

    })

  }

  transformProtocolo(event: any): void {

    if (this.data.notario === "") {
      alert("No tiene seleccionado 'Notario'.");
      return;
    }
    let type = "P";

    switch (this.data.area) {

      case "Protocolo":
        type = "P";
        break;

      case "Expediente":
        type = "E";
        break

      case "Poliza":
        type = "C";
        break;

    }
    this.data.newNumber = GlobalFunctions.tranformProtocolo(type + event.target.value, this.data.notario).toString();
  }

};

