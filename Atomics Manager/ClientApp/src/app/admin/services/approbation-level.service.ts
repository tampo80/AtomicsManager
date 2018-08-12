import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpRequest, HttpEvent, HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';
import { ApprobationLevel } from '../models/approbation-level';

@Injectable({
  providedIn: 'root'
})
export class ApprobationLevelService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _approbationLevelUrl: string = '/api/Approbationlevel';
  private readonly _approbationLevelUrlIsExiste: string = '/api/Approbationlevel/Isavailable';


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getApprobationLevel(): Observable<ApprobationLevel[]> {
  return this.http.get<ApprobationLevel[]>(ConfigService.rootUrl + this._approbationLevelUrl, this.getRequestHeaders());

}

getExpertApprobationLevel(): Observable<ApprobationLevel[]> {
  return this.http.get<ApprobationLevel[]>(ConfigService.rootUrl + this._approbationLevelUrl + '/expertise', this.getRequestHeaders());

}

getApprobationLevelByPaysId(id?: number): Observable<ApprobationLevel[]> {
  return this.http.get<ApprobationLevel[]>(ConfigService.rootUrl + this._approbationLevelUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteApprobationLevel(ApprobationLevelId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._approbationLevelUrl + '/' + ApprobationLevelId, this.getRequestHeaders());
 }

 addApprobationLevel(approbationLevel: ApprobationLevel): Observable<ApprobationLevel> {
   return this.http.post<ApprobationLevel>(ConfigService.rootUrl + this._approbationLevelUrl, JSON.stringify(approbationLevel), this.getRequestHeaders());
 }


 updateApprobationLevel(approbationLevel: ApprobationLevel): Observable<ApprobationLevel> {
  return this.http.put<ApprobationLevel>(ConfigService.rootUrl + this._approbationLevelUrl + '/' + approbationLevel.id, JSON.stringify(approbationLevel), this.getRequestHeaders());
}


isExiste(approbationLevelName: string) {
  return this.http.get(ConfigService.rootUrl + this._approbationLevelUrlIsExiste + '/' + approbationLevelName, this.getRequestHeaders());
}
}


