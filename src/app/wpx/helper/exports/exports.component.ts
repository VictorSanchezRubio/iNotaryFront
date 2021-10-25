import { Component, Input, OnInit } from '@angular/core';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import jsonNotaria from "../../../../assets/json/notaria.json";

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {


  @Input("screen") screenExport: string;
  @Input() filter: any;
  @Input() dades: any;

  Notaria: any = jsonNotaria;

  constructor(public services: WpxServicesService) { }

  ngOnInit(): void {
  }



  exportOption(typeExport: any): void {

      const dataSend = {
      type: typeExport,
      screen: this.screenExport,
      filter: this.filter,
      dades: this.dades

    };

    this.services.exportSearch(dataSend).subscribe(data => {
      window.open(this.Notaria[0].api + "/" + data.detail, '_blank');
    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });

  }

}