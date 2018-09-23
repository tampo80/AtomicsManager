import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { BonLivraison } from '../models/bon-livraison';

@Injectable({
  providedIn: 'root'
})
export class BonLivraisonService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _bonLivraisonUrl: string = '/api/bonLivraison';
  private readonly _bonLivraisonUrlIsExiste: string = '/api/bonLivraison/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getBonLivraisonOut(): Observable<BonLivraison[]> {
  return this.http.get<BonLivraison[]>(ConfigService.rootUrl + this._bonLivraisonUrl, this.getRequestHeaders());

}


getBonLivraisonIn(): Observable<BonLivraison[]> {
  return this.http.get<BonLivraison[]>(ConfigService.rootUrl + this._bonLivraisonUrl + '/in', this.getRequestHeaders());

}
getBonLivraisonBydemandId(id?: number): Observable<BonLivraison> {
  return this.http.get<BonLivraison>(ConfigService.rootUrl + this._bonLivraisonUrl + '/BonLivraisonBydemandId/' + id, this.getRequestHeaders());

}

deleteBonLivraison(BonLivraisonId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._bonLivraisonUrl + '/' + BonLivraisonId, this.getRequestHeaders());
 }

 addBonLivraison(bonLivraison: BonLivraison): Observable<BonLivraison> {
   return this.http.post<BonLivraison>(ConfigService.rootUrl + this._bonLivraisonUrl, JSON.stringify(bonLivraison), this.getRequestHeaders());
 }



 updateBonLivraison(bonLivraison: BonLivraison): Observable<BonLivraison> {
  return this.http.put<BonLivraison>(ConfigService.rootUrl + this._bonLivraisonUrl + '/' + bonLivraison.id, JSON.stringify(bonLivraison), this.getRequestHeaders());
}



isExiste(bonLivraisonName: string) {
  return this.http.get(ConfigService.rootUrl + this._bonLivraisonUrlIsExiste + '/' + bonLivraisonName, this.getRequestHeaders());
}
}


