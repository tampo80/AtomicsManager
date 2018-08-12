import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Secteurs } from '../models/secteurs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';


@Injectable({
  providedIn: 'root'
})
export class SecteursService {


  constructor(private router: Router, private http: HttpClient) { }

  private readonly _secteursUrl: string = '/api/secteurs';
  private readonly _secteursUrlIsExiste: string = '/api/secteurs/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getSecteurs(): Observable<Secteurs[]> {
  return this.http.get<Secteurs[]>(ConfigService.rootUrl + this._secteursUrl, this.getRequestHeaders());

}

deleteSecteurs(SecteursId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._secteursUrl + '/' + SecteursId, this.getRequestHeaders());
 }

 addSecteurs(secteurs: Secteurs): Observable<Secteurs> {
   return this.http.post<Secteurs>(ConfigService.rootUrl + this._secteursUrl, JSON.stringify(secteurs), this.getRequestHeaders());
 }


 updateSecteurs(secteurs: Secteurs): Observable<Secteurs> {
  return this.http.put<Secteurs>(ConfigService.rootUrl + this._secteursUrl + '/' + secteurs.id, JSON.stringify(secteurs), this.getRequestHeaders());
}


isExiste(secteursName: string) {
  return this.http.get(ConfigService.rootUrl + this._secteursUrlIsExiste + '/' + secteursName, this.getRequestHeaders());
}
}
