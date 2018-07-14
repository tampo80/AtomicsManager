import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Fournisseurs } from '../models/fournisseurs.model';
import { EditFournisseurs } from '../models/edit-fournisseurs';


@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _fournisseursUrl: string = "/api/fournisseurs";
  private readonly _fournisseursUrlIsExiste: string = "/api/fournisseurs/Isavailable";
  


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
       
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getFournisseurs():Observable<Fournisseurs[]> {
  return this.http.get<Fournisseurs[]>(ConfigService.rootUrl+this._fournisseursUrl,this.getRequestHeaders());
                
}

deleteFournisseurs(FournisseursId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._fournisseursUrl+"/"+FournisseursId,this.getRequestHeaders());
 }

 addFournisseurs(fournisseurs:FormData):Observable<EditFournisseurs>{
   console.log(fournisseurs);
  

   return this.http.post<EditFournisseurs>(ConfigService.rootUrl+this._fournisseursUrl,fournisseurs);
 };


 updateFournisseurs(fournisseurs:Fournisseurs):Observable<Fournisseurs>{
  return this.http.put<Fournisseurs>(ConfigService.rootUrl+this._fournisseursUrl+"/"+fournisseurs.id,JSON.stringify(fournisseurs),this.getRequestHeaders());
};


isExiste(fournisseursName:string)
{
  return this.http.get(ConfigService.rootUrl+this._fournisseursUrlIsExiste+"/"+fournisseursName,this.getRequestHeaders());
}
}
