import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from '../../../../node_modules/rxjs';
import { Entreprise } from '../models/entreprise-model';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _entreprisesUrl: string = "/api/entreprise";
  private readonly _entreprisesUrlIsExiste: string = "/api/entreprise/Isavailable";



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}


uploadLogo(image:any):Observable<{}>{
  return this.http.post<Entreprise>(ConfigService.rootUrl+this._entreprisesUrl+"/uploadLogo",image,{
    reportProgress: true,
    observe: 'events'
  });
}

getEntreprises():Observable<Entreprise> {
  return this.http.get<Entreprise>(ConfigService.rootUrl+this._entreprisesUrl,this.getRequestHeaders());
}

deleteEntreprises(EntreprisesId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._entreprisesUrl+"/"+EntreprisesId,this.getRequestHeaders());
 }

 addEntreprises(entreprise:Entreprise):Observable<Entreprise>{
   return this.http.post<Entreprise>(ConfigService.rootUrl+this._entreprisesUrl,JSON.stringify(entreprise),this.getRequestHeaders());
 };


 updateEntreprises(entreprise:Entreprise):Observable<Entreprise>{
  return this.http.put<Entreprise>(ConfigService.rootUrl+this._entreprisesUrl+"/"+entreprise.id,JSON.stringify(entreprise),this.getRequestHeaders());
};


isExiste(entreprisesName:string)
{
  return this.http.get(ConfigService.rootUrl+this._entreprisesUrlIsExiste+"/"+entreprisesName,this.getRequestHeaders());
}
}
