import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Activite } from '../models/activite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _activiteUrl: string = '/api/activite';
  private readonly _activiteUrlIsExiste: string = '/api/activite/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getActivite(): Observable<Activite[]> {
  return this.http.get<Activite[]>(ConfigService.rootUrl + this._activiteUrl, this.getRequestHeaders());

}

deleteActivite(ActiviteId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._activiteUrl + '/' + ActiviteId, this.getRequestHeaders());
 }

 addActivite(activite: Activite): Observable<Activite> {
   return this.http.post<Activite>(ConfigService.rootUrl + this._activiteUrl, JSON.stringify(activite), this.getRequestHeaders());
 }


 updateActivite(activite: Activite): Observable<Activite> {
  return this.http.put<Activite>(ConfigService.rootUrl + this._activiteUrl + '/' + activite.id, JSON.stringify(activite), this.getRequestHeaders());
}


isExiste(activiteName: string) {
  return this.http.get(ConfigService.rootUrl + this._activiteUrlIsExiste + '/' + activiteName, this.getRequestHeaders());
}
}


