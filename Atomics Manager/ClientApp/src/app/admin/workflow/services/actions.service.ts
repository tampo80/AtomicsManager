import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Actions } from '../models/actions';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(private router: Router, private http: HttpClient) { }

  private readonly _actionsUrl: string = '/api/actions';
  private readonly _actionsUrlIsExiste: string = '/api/actions/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getActions(): Observable<Actions[]> {
  return this.http.get<Actions[]>(ConfigService.rootUrl + this._actionsUrl, this.getRequestHeaders());

}

deleteActions(ActionsId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._actionsUrl + '/' + ActionsId, this.getRequestHeaders());
 }

 addActions(actions: Actions): Observable<Actions> {
   return this.http.post<Actions>(ConfigService.rootUrl + this._actionsUrl, JSON.stringify(actions), this.getRequestHeaders());
 }


 updateActions(actions: Actions): Observable<Actions> {
  return this.http.put<Actions>(ConfigService.rootUrl + this._actionsUrl + '/' + actions.id, JSON.stringify(actions), this.getRequestHeaders());
}


isExiste(actionsName: string) {
  return this.http.get(ConfigService.rootUrl + this._actionsUrlIsExiste + '/' + actionsName, this.getRequestHeaders());
}
}


