import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ActionTarget } from '../models/action-target';


@Injectable({
  providedIn: 'root'
})
export class ActionTargetService {
  constructor(private router: Router, private http: HttpClient) { }

  private readonly _actionTargetUrl: string = '/api/actionTarget';
  private readonly _actionTargetUrlIsExiste: string = '/api/actionTarget/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getActionTarget(): Observable<ActionTarget[]> {
  return this.http.get<ActionTarget[]>(ConfigService.rootUrl + this._actionTargetUrl, this.getRequestHeaders());

}

getActionTargetByActionId(actionId): Observable<ActionTarget> {
  return this.http.get<ActionTarget>(ConfigService.rootUrl + this._actionTargetUrl + '/' + actionId, this.getRequestHeaders());

}

deleteActionTarget(ActionTargetId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._actionTargetUrl + '/' + ActionTargetId, this.getRequestHeaders());
 }

 addActionTarget(actionTarget: ActionTarget): Observable<ActionTarget> {
   return this.http.post<ActionTarget>(ConfigService.rootUrl + this._actionTargetUrl, JSON.stringify(actionTarget), this.getRequestHeaders());
 }


 updateActionTarget(actionTarget: ActionTarget): Observable<ActionTarget> {
  return this.http.put<ActionTarget>(ConfigService.rootUrl + this._actionTargetUrl + '/' + actionTarget.id, JSON.stringify(actionTarget), this.getRequestHeaders());
}


isExiste(actionTargetName: string) {
  return this.http.get(ConfigService.rootUrl + this._actionTargetUrlIsExiste + '/' + actionTargetName, this.getRequestHeaders());
}
}


