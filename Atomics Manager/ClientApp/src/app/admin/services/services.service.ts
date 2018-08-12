import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _servicesUrl: string = '/api/services';
  private readonly _servicesUrlIsExiste: string = '/api/services/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getServices(): Observable<Services[]> {
  return this.http.get<Services[]>(ConfigService.rootUrl + this._servicesUrl, this.getRequestHeaders());

}

getServicesByDepartementsId(id?: number): Observable<Services[]> {
  return this.http.get<Services[]>(ConfigService.rootUrl + this._servicesUrl + '/bydepartementsid/' + id, this.getRequestHeaders());

}

deleteServices(ServicesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._servicesUrl + '/' + ServicesId, this.getRequestHeaders());
 }

 addServices(services: Services): Observable<Services> {
   return this.http.post<Services>(ConfigService.rootUrl + this._servicesUrl, JSON.stringify(services), this.getRequestHeaders());
 }


 updateServices(services: Services): Observable<Services> {
  return this.http.put<Services>(ConfigService.rootUrl + this._servicesUrl + '/' + services.id, JSON.stringify(services), this.getRequestHeaders());
}


isExiste(servicesName: string) {
  return this.http.get(ConfigService.rootUrl + this._servicesUrlIsExiste + '/' + servicesName, this.getRequestHeaders());
}
}


