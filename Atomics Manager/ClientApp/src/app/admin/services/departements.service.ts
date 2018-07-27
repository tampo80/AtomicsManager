import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Departements } from '../models/departements';

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _departementsUrl: string = "/api/departements";
  private readonly _departementsUrlIsExiste: string = "/api/departements/Isavailable";



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getDepartements():Observable<Departements[]> {
  return this.http.get<Departements[]>(ConfigService.rootUrl+this._departementsUrl,this.getRequestHeaders());

}

getDepartementsByPaysId(id?:number):Observable<Departements[]> {
  return this.http.get<Departements[]>(ConfigService.rootUrl+this._departementsUrl+"/bypaysid/"+id,this.getRequestHeaders());

}

deleteDepartements(DepartementsId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._departementsUrl+"/"+DepartementsId,this.getRequestHeaders());
 }

 addDepartements(departements:Departements):Observable<Departements>{
   return this.http.post<Departements>(ConfigService.rootUrl+this._departementsUrl,JSON.stringify(departements),this.getRequestHeaders());
 };


 updateDepartements(departements:Departements):Observable<Departements>{
  return this.http.put<Departements>(ConfigService.rootUrl+this._departementsUrl+"/"+departements.id,JSON.stringify(departements),this.getRequestHeaders());
};


isExiste(departementsName:string)
{
  return this.http.get(ConfigService.rootUrl+this._departementsUrlIsExiste+"/"+departementsName,this.getRequestHeaders());
}
}


