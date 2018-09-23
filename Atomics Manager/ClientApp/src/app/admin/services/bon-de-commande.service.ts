import { Injectable } from '@angular/core';
import { BonDeCommande } from '../models/bon-de-commande';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BonDeCommandeService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _bonDeCommandeUrl: string = '/api/bonDeCommande';
  private readonly _bonDeCommandeUrlIsExiste: string = '/api/bonDeCommande/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getBonDeCommandeOut(): Observable<BonDeCommande[]> {
  return this.http.get<BonDeCommande[]>(ConfigService.rootUrl + this._bonDeCommandeUrl, this.getRequestHeaders());

}


getBonDeCommandeIn(): Observable<BonDeCommande[]> {
  return this.http.get<BonDeCommande[]>(ConfigService.rootUrl + this._bonDeCommandeUrl + '/in', this.getRequestHeaders());

}
getBonDeCommandeBydemandId(id?: number): Observable<BonDeCommande> {
  return this.http.get<BonDeCommande>(ConfigService.rootUrl + this._bonDeCommandeUrl + '/BonDeCommandeBydemandId/' + id, this.getRequestHeaders());

}
getBonDeCommandeById(id?: number): Observable<BonDeCommande> {
  return this.http.get<BonDeCommande>(ConfigService.rootUrl + this._bonDeCommandeUrl + '/' + id, this.getRequestHeaders());

}

getBonDeCommandeRef(id?: number): Observable<string> {
  return this.http.get<string>(ConfigService.rootUrl + this._bonDeCommandeUrl + '/BonDeCommandeRef/' + id, this.getRequestHeaders());

}

deleteBonDeCommande(BonDeCommandeId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._bonDeCommandeUrl + '/' + BonDeCommandeId, this.getRequestHeaders());
 }

 addBonDeCommande(bonDeCommande: BonDeCommande): Observable<BonDeCommande> {
   return this.http.post<BonDeCommande>(ConfigService.rootUrl + this._bonDeCommandeUrl, JSON.stringify(bonDeCommande), this.getRequestHeaders());
 }



 updateBonDeCommande(bonDeCommande: BonDeCommande): Observable<BonDeCommande> {
  return this.http.put<BonDeCommande>(ConfigService.rootUrl + this._bonDeCommandeUrl + '/' + bonDeCommande.id, JSON.stringify(bonDeCommande), this.getRequestHeaders());
}



isExiste(bonDeCommandeName: string) {
  return this.http.get(ConfigService.rootUrl + this._bonDeCommandeUrlIsExiste + '/' + bonDeCommandeName, this.getRequestHeaders());
}
}


