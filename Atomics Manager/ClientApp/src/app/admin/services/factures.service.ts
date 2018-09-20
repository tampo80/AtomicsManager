import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Factures } from '../models/factures';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _facturesUrl: string = '/api/factures';
  private readonly _facturesUrlIsExiste: string = '/api/factures/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getFacturesOut(): Observable<Factures[]> {
  return this.http.get<Factures[]>(ConfigService.rootUrl + this._facturesUrl, this.getRequestHeaders());

}


getFacturesIn(): Observable<Factures[]> {
  return this.http.get<Factures[]>(ConfigService.rootUrl + this._facturesUrl + '/in', this.getRequestHeaders());

}
getFacturesBydemandId(id?: number): Observable<Factures> {
  return this.http.get<Factures>(ConfigService.rootUrl + this._facturesUrl + '/FacturesBydemandId/' + id, this.getRequestHeaders());

}

deleteFactures(FacturesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._facturesUrl + '/' + FacturesId, this.getRequestHeaders());
 }

 addFactures(factures: Factures): Observable<Factures> {
   return this.http.post<Factures>(ConfigService.rootUrl + this._facturesUrl, JSON.stringify(factures), this.getRequestHeaders());
 }



 updateFactures(factures: Factures): Observable<Factures> {
  return this.http.put<Factures>(ConfigService.rootUrl + this._facturesUrl + '/' + factures.id, JSON.stringify(factures), this.getRequestHeaders());
}



isExiste(facturesName: string) {
  return this.http.get(ConfigService.rootUrl + this._facturesUrlIsExiste + '/' + facturesName, this.getRequestHeaders());
}
}


