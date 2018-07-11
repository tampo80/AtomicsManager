import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {GlobalErrorInterceptor} from "../interceptors/global-error.interceptor";
import { Pays } from '../models/pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _paysUrl: string = "/api/pays";
  private readonly _paysUrlIsExiste: string = "/api/pays/Isavailable";
  


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
       
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getPays():Observable<Pays[]> {
  return this.http.get<Pays[]>(ConfigService.rootUrl+this._paysUrl,this.getRequestHeaders());
                
}

deletePays(PaysId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._paysUrl+"/"+PaysId,this.getRequestHeaders());
 }

 addPays(pays:Pays):Observable<Pays>{
   return this.http.post<Pays>(ConfigService.rootUrl+this._paysUrl,JSON.stringify(pays),this.getRequestHeaders());
 };


 updatePays(pays:Pays):Observable<Pays>{
  return this.http.put<Pays>(ConfigService.rootUrl+this._paysUrl+"/"+pays.id,JSON.stringify(pays),this.getRequestHeaders());
};


isExiste(paysName:string)
{
  return this.http.get(ConfigService.rootUrl+this._paysUrlIsExiste+"/"+paysName,this.getRequestHeaders());
}
}
