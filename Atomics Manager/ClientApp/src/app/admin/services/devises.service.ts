import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Devises } from '../models/devises';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class DevisesService {


  constructor(private router: Router, private http: HttpClient) { }

  private readonly _devisesUrl: string = "/api/devises";
  private readonly _devisesUrlIsExiste: string = "/api/devises/Isavailable";
  


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
       
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getDevises():Observable<Devises[]> {
  return this.http.get<Devises[]>(ConfigService.rootUrl+this._devisesUrl,this.getRequestHeaders());
                
}

deleteDevises(DevisesId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._devisesUrl+"/"+DevisesId,this.getRequestHeaders());
 }

 addDevises(devises:Devises):Observable<Devises>{
   return this.http.post<Devises>(ConfigService.rootUrl+this._devisesUrl,JSON.stringify(devises),this.getRequestHeaders());
 };


 updateDevises(devises:Devises):Observable<Devises>{
  return this.http.put<Devises>(ConfigService.rootUrl+this._devisesUrl+"/"+devises.id,JSON.stringify(devises),this.getRequestHeaders());
};


isExiste(devisesName:string)
{
  return this.http.get(ConfigService.rootUrl+this._devisesUrlIsExiste+"/"+devisesName,this.getRequestHeaders());
}
}
