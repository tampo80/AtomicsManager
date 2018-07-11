import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Villes } from '../models/villes';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';


@Injectable({
  providedIn: 'root'
})
export class VillesService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _villesUrl: string = "/api/villes";
  private readonly _villesUrlIsExiste: string = "/api/villes/Isavailable";
  


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
       
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getVilles():Observable<Villes[]> {
  return this.http.get<Villes[]>(ConfigService.rootUrl+this._villesUrl,this.getRequestHeaders());
                
}

deleteVilles(VillesId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._villesUrl+"/"+VillesId,this.getRequestHeaders());
 }

 addVilles(villes:Villes):Observable<Villes>{
   return this.http.post<Villes>(ConfigService.rootUrl+this._villesUrl,JSON.stringify(villes),this.getRequestHeaders());
 };


 updateVilles(villes:Villes):Observable<Villes>{
  return this.http.put<Villes>(ConfigService.rootUrl+this._villesUrl+"/"+villes.id,JSON.stringify(villes),this.getRequestHeaders());
};


isExiste(villesName:string)
{
  return this.http.get(ConfigService.rootUrl+this._villesUrlIsExiste+"/"+villesName,this.getRequestHeaders());
}
}


