import { Injectable } from '@angular/core';
import { Agences } from '../models/agences';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { EditAgences } from '../models/edit-agences';

@Injectable({
  providedIn: 'root'
})
export class AgencesService {


  constructor(private router: Router, private http: HttpClient) { }


  private readonly _agencesUrl: string = "/api/agences";
  private readonly _agencesUrlIsExiste: string = "/api/agences/Isavailable";



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getAgences():Observable<Agences[]> {
  return this.http.get<Agences[]>(ConfigService.rootUrl+this._agencesUrl,this.getRequestHeaders());

}

getAgencesByPaysId(id?:number):Observable<Agences[]> {
  return this.http.get<Agences[]>(ConfigService.rootUrl+this._agencesUrl+"/bypaysid/"+id,this.getRequestHeaders());

}

deleteAgences(AgencesId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._agencesUrl+"/"+AgencesId,this.getRequestHeaders());
 }

 addAgences(agences:EditAgences):Observable<Agences>{
   return this.http.post<Agences>(ConfigService.rootUrl+this._agencesUrl,JSON.stringify(agences),this.getRequestHeaders());
 };


 updateAgences(agences:Agences):Observable<Agences>{
  return this.http.put<Agences>(ConfigService.rootUrl+this._agencesUrl+"/"+agences.id,JSON.stringify(agences),this.getRequestHeaders());
};


isExiste(agencesName:string)
{
  return this.http.get(ConfigService.rootUrl+this._agencesUrlIsExiste+"/"+agencesName,this.getRequestHeaders());
}
}


