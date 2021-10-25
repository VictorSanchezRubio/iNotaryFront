import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jsonNotaria from "../../assets/json/notaria.json";

@Injectable({
  providedIn: 'root'
})


export class WpxServicesService {

  Notaria: any = jsonNotaria;

  readonly url = this.Notaria[0].api;
  readonly token = sessionStorage.getItem("access_token");

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url + "/login", user);
  }

  logout(user: any): Observable<any> {
    return this.http.post(this.url + "/logout", user);
  }

  getData(table: any): Observable<any> {
    return this.http.post(this.url + "/get-data", table);
  }

  getNewData(table: any): Promise<any> {
    return this.http.post(this.url + "/get-data", table).toPromise();
  }


  loadVersion(): Observable<any> {
    return this.http.get(this.url + "/version-idb");
  }

  loadSearch(options: any): Observable<any> {
    return this.http.post(this.url + "/search", options);
  }

  exportSearch(values: any): Observable<any> {
    return this.http.post(this.url + "/export-search", values);
  }

  lastNumber(values: any): Observable<any> {
    return this.http.get(this.url + "/last-number/" + values);
  }

  newProtocol(values: any): Observable<any> {
    return this.http.post(this.url + "/new-protocol", values, this.httpOptions);
  }
  /*
    loadTramiate(value: any): Observable<any> {
      return this.http.get<any>(this.url + "/procedure/" + value);
    }
  */

  loadTramiate(value: any): Promise<any> {
    return this.http.get<any>(this.url + "/procedure/" + value).toPromise();
  }

  updateTramite(value: any, fields: any): Observable<any> {
    return this.http.put(this.url + "/procedure/" + value, fields, this.httpOptions);
  }

  loadFieldsConcepto(concepto: any): Observable<any> {
    return this.http.get(this.url + "/load-fields-concepto/" + concepto);
  }

  loadStructureConcepto(concepto: any): Observable<any> {
    return this.http.get(this.url + "/load-structure-concepto/" + concepto);
  }

  loadDashboard(seleccion: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept-Encoding', 'gzip, deflate, br');
    return this.http.get<any>(this.url + "/dashboard/" + seleccion);
  }

  loadReport(seleccion: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept-Encoding', 'gzip, deflate, br');
    return this.http.get<any>(this.url + "/reports/" + seleccion);
  }

}