import { Injectable } from '@angular/core';
import { _MatTabLinkBase } from '@angular/material/tabs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WpxServicesIndexDBService {

  constructor(private dbService: NgxIndexedDBService) { }

  clearStoreName(table: any) {
    this.dbService
      .clear(table)
      .subscribe((successDeleted) => {
        console.log("success? ", successDeleted);
      })

  }

  addTipoidentificacion(values: any) {

    this.dbService
      .add('tipoidentificacion', {
        tipoID_CODIGO: values["tipoID_CODIGO"],
        tipoID_DESCRIPCION: values["tipoID_DESCRIPCION"],
        tipoID_TIPOPERSONA: values["tipoID_TIPOPERSONA"],
      })
      .subscribe((key) => {
        console.log('key: ', key);
      });


  }


  addAllTipoidentificacion(values: any) {
    this.dbService
      .bulkAdd('tipoidentificacion',
        values).subscribe((result) => {
          console.log('result: ', result);


        });

  }

  addAll(table:any, values: any) {
    this.dbService
      .bulkAdd(table,
        values).subscribe((result) => {
          console.log('result: ', result);
        });

  }
/*
getAll(table:any): Observable <T> {

  let values;
  this.dbService
    .getAll(table)
    .subscribe((tables) => {
      values = tables;
      console.log(values);
      return values;
    });
   // return "dddd";
}
*/

}
