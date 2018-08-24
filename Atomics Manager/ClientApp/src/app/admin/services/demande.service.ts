import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Demandes } from '../models/demandes';
import { CommentAction } from '../models/comment-action';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _demandesUrl: string = '/api/demandes';
  private readonly _demandesUrlIsExiste: string = '/api/demandes/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getDemandesOut(): Observable<Demandes[]> {
  return this.http.get<Demandes[]>(ConfigService.rootUrl + this._demandesUrl, this.getRequestHeaders());

}


getDemandesIn(): Observable<Demandes[]> {
  return this.http.get<Demandes[]>(ConfigService.rootUrl + this._demandesUrl + '/in', this.getRequestHeaders());

}
getDemandesByPaysId(id?: number): Observable<Demandes[]> {
  return this.http.get<Demandes[]>(ConfigService.rootUrl + this._demandesUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteDemandes(DemandesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._demandesUrl + '/' + DemandesId, this.getRequestHeaders());
 }

 addDemandes(demandes: Demandes): Observable<Demandes> {
   return this.http.post<Demandes>(ConfigService.rootUrl + this._demandesUrl, JSON.stringify(demandes), this.getRequestHeaders());
 }

 commentDemandes(commentAction: CommentAction): Observable<{}> {
  return this.http.post<{}>(ConfigService.rootUrl + this._demandesUrl + '/commentAction', commentAction, this.getRequestHeaders());
}

 updateDemandes(demandes: Demandes): Observable<Demandes> {
  return this.http.put<Demandes>(ConfigService.rootUrl + this._demandesUrl + '/' + demandes.id, JSON.stringify(demandes), this.getRequestHeaders());
}



isExiste(demandesName: string) {
  return this.http.get(ConfigService.rootUrl + this._demandesUrlIsExiste + '/' + demandesName, this.getRequestHeaders());
}
}


