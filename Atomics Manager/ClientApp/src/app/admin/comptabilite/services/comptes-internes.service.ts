import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComptesInternes } from '../models/comptes-internes';
import { ConfigService } from '../../services/config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComptesInternesService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _comptesInternesUrl: string = '/api/comptesInternes';
  private readonly _comptesInternesUrlIsExiste: string = '/api/comptesInternes/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getComptesInternes(): Observable<ComptesInternes[]> {
  return this.http.get<ComptesInternes[]>(ConfigService.rootUrl + this._comptesInternesUrl, this.getRequestHeaders());

}

getComptesInternesByPaysId(id?: number): Observable<ComptesInternes[]> {
  return this.http.get<ComptesInternes[]>(ConfigService.rootUrl + this._comptesInternesUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteComptesInternes(ComptesInternesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._comptesInternesUrl + '/' + ComptesInternesId, this.getRequestHeaders());
 }

 addComptesInternes(comptesInternes: ComptesInternes): Observable<ComptesInternes> {
   return this.http.post<ComptesInternes>(ConfigService.rootUrl + this._comptesInternesUrl, JSON.stringify(comptesInternes), this.getRequestHeaders());
 }


 updateComptesInternes(comptesInternes: ComptesInternes): Observable<ComptesInternes> {
  return this.http.put<ComptesInternes>(ConfigService.rootUrl + this._comptesInternesUrl + '/' + comptesInternes.id, JSON.stringify(comptesInternes), this.getRequestHeaders());
}


isExiste(comptesInternesName: string) {
  return this.http.get(ConfigService.rootUrl + this._comptesInternesUrlIsExiste + '/' + comptesInternesName, this.getRequestHeaders());
}
}


