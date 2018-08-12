import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { ConfigService } from './config.service';
import { Observable } from '../../../../node_modules/rxjs';
import { EntrepriseUserInfos } from '../models/entreprise-user-infos';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseUserInfosService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _entrepriseUserInfosUrl: string = '/api/EntrepriseUserInfos';
  private readonly _entrepriseUserInfosUrlIsExiste: string = '/api/EntrepriseUserInfos/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}


uploadLogo(image: any): Observable<HttpEvent<any>> {

  const req = new HttpRequest('POST', ConfigService.rootUrl + this._entrepriseUserInfosUrl + '/uploadLogo', image, {reportProgress: true});

  return this.http.request(req);
}

getEntrepriseUserInfos(): Observable<EntrepriseUserInfos> {
  return this.http.get<EntrepriseUserInfos>(ConfigService.rootUrl + this._entrepriseUserInfosUrl, this.getRequestHeaders());
}

getEntrepriseUserInfosByUserId(id: string): Observable<EntrepriseUserInfos> {
  return this.http.get<EntrepriseUserInfos>(ConfigService.rootUrl + this._entrepriseUserInfosUrl + '/getentrepriseuserInfosbyuserid/' + id, this.getRequestHeaders());
}

deleteEntrepriseUserInfos(EntrepriseUserInfosId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._entrepriseUserInfosUrl + '/' + EntrepriseUserInfosId, this.getRequestHeaders());
 }

 addEntrepriseUserInfos(entreprise: EntrepriseUserInfos): Observable<EntrepriseUserInfos> {
   return this.http.post<EntrepriseUserInfos>(ConfigService.rootUrl + this._entrepriseUserInfosUrl, JSON.stringify(entreprise), this.getRequestHeaders());
 }


 updateEntrepriseUserInfos(entreprise: EntrepriseUserInfos): Observable<EntrepriseUserInfos> {
  return this.http.put<EntrepriseUserInfos>(ConfigService.rootUrl + this._entrepriseUserInfosUrl + '/' + entreprise.id, JSON.stringify(entreprise), this.getRequestHeaders());
}


isExiste(entrepriseUserInfosName: string) {
  return this.http.get(ConfigService.rootUrl + this._entrepriseUserInfosUrlIsExiste + '/' + entrepriseUserInfosName, this.getRequestHeaders());
}
}
