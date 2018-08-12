import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from '../../../../node_modules/rxjs';
import { ApprobationWorkflow } from '../models/approbation-workflow';

@Injectable({
  providedIn: 'root'
})
export class ApprobationWorkflowService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _approbationWorkflowUrl: string = '/api/approbationWorkflow';
  private readonly _approbationWorkflowUrlIsExiste: string = '/api/approbationWorkflow/Isavailable';


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getApprobationWorkflow(): Observable<ApprobationWorkflow[]> {
  return this.http.get<ApprobationWorkflow[]>(ConfigService.rootUrl + this._approbationWorkflowUrl, this.getRequestHeaders());

}
getApprobationWorkflowByDemandeId(id?: number): Observable<ApprobationWorkflow[]> {
  return this.http.get<ApprobationWorkflow[]>(ConfigService.rootUrl + this._approbationWorkflowUrl + '/' + id, this.getRequestHeaders());

}

getApprobationWorkflowByPaysId(id?: number): Observable<ApprobationWorkflow[]> {
  return this.http.get<ApprobationWorkflow[]>(ConfigService.rootUrl + this._approbationWorkflowUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteApprobationWorkflow(ApprobationWorkflowId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._approbationWorkflowUrl + '/' + ApprobationWorkflowId, this.getRequestHeaders());
 }

 addApprobationWorkflow(approbationWorkflow: ApprobationWorkflow): Observable<ApprobationWorkflow> {
   return this.http.post<ApprobationWorkflow>(ConfigService.rootUrl + this._approbationWorkflowUrl, JSON.stringify(approbationWorkflow), this.getRequestHeaders());
 }


 updateApprobationWorkflow(approbationWorkflow: ApprobationWorkflow): Observable<ApprobationWorkflow> {
  return this.http.put<ApprobationWorkflow>(ConfigService.rootUrl + this._approbationWorkflowUrl + '/' + approbationWorkflow.id, JSON.stringify(approbationWorkflow), this.getRequestHeaders());
}


isExiste(approbationWorkflowName: string) {
  return this.http.get(ConfigService.rootUrl + this._approbationWorkflowUrlIsExiste + '/' + approbationWorkflowName, this.getRequestHeaders());
}
}


