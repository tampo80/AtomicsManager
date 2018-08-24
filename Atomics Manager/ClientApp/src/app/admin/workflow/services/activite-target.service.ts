import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs';
import { ActiviteTarget } from '../models/activite-target';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActiviteTargetService {
  constructor(private router: Router, private http: HttpClient) { }

  private readonly _activiteTargetUrl: string = '/api/activiteTarget';
  private readonly _activiteTargetUrlIsExiste: string = '/api/activiteTarget/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getActiviteTarget(): Observable<ActiviteTarget[]> {
  return this.http.get<ActiviteTarget[]>(ConfigService.rootUrl + this._activiteTargetUrl, this.getRequestHeaders());

}

getActiviteTargetByActiviteId(actionId): Observable<ActiviteTarget> {
  return this.http.get<ActiviteTarget>(ConfigService.rootUrl + this._activiteTargetUrl + '/' + actionId, this.getRequestHeaders());

}

deleteActiviteTarget(ActiviteTargetId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._activiteTargetUrl + '/' + ActiviteTargetId, this.getRequestHeaders());
 }

 addActiviteTarget(activiteTarget: ActiviteTarget): Observable<ActiviteTarget> {
   return this.http.post<ActiviteTarget>(ConfigService.rootUrl + this._activiteTargetUrl, JSON.stringify(activiteTarget), this.getRequestHeaders());
 }


 updateActiviteTarget(activiteTarget: ActiviteTarget): Observable<ActiviteTarget> {
  return this.http.put<ActiviteTarget>(ConfigService.rootUrl + this._activiteTargetUrl + '/' + activiteTarget.id, JSON.stringify(activiteTarget), this.getRequestHeaders());
}


isExiste(activiteTargetName: string) {
  return this.http.get(ConfigService.rootUrl + this._activiteTargetUrlIsExiste + '/' + activiteTargetName, this.getRequestHeaders());
}
}


