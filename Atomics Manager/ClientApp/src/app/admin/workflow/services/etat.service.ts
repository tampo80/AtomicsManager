import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs/Observable';
import { Etat } from '../models/etat';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _etatUrl: string = '/api/etat';
  private readonly _etatUrlIsExiste: string = '/api/etat/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getEtat(): Observable<Etat[]> {
  return this.http.get<Etat[]>(ConfigService.rootUrl + this._etatUrl, this.getRequestHeaders());

}

deleteEtat(EtatId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._etatUrl + '/' + EtatId, this.getRequestHeaders());
 }

 addEtat(etat: Etat): Observable<Etat> {
   return this.http.post<Etat>(ConfigService.rootUrl + this._etatUrl, JSON.stringify(etat), this.getRequestHeaders());
 }


 updateEtat(etat: Etat): Observable<Etat> {
  return this.http.put<Etat>(ConfigService.rootUrl + this._etatUrl + '/' + etat.id, JSON.stringify(etat), this.getRequestHeaders());
}


isExiste(etatName: string) {
  return this.http.get(ConfigService.rootUrl + this._etatUrlIsExiste + '/' + etatName, this.getRequestHeaders());
}
}


