import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs';
import { TypeComptes } from '../models/type-comptes';

@Injectable({
  providedIn: 'root'
})
export class TypeComptesService {

  constructor(private router: Router, private http: HttpClient) { }


  private readonly _typeComptesUrl: string = '/api/typeComptes';
  private readonly _typeComptesUrlIsExiste: string = '/api/typeComptes/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getTypeComptes(): Observable<TypeComptes[]> {
  return this.http.get<TypeComptes[]>(ConfigService.rootUrl + this._typeComptesUrl, this.getRequestHeaders());

}

getTypeComptesByPaysId(id?: number): Observable<TypeComptes[]> {
  return this.http.get<TypeComptes[]>(ConfigService.rootUrl + this._typeComptesUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteTypeComptes(TypeComptesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._typeComptesUrl + '/' + TypeComptesId, this.getRequestHeaders());
 }

 addTypeComptes(typeComptes: TypeComptes): Observable<TypeComptes> {
   return this.http.post<TypeComptes>(ConfigService.rootUrl + this._typeComptesUrl, JSON.stringify(typeComptes), this.getRequestHeaders());
 }


 updateTypeComptes(typeComptes: TypeComptes): Observable<TypeComptes> {
  return this.http.put<TypeComptes>(ConfigService.rootUrl + this._typeComptesUrl + '/' + typeComptes.id, JSON.stringify(typeComptes), this.getRequestHeaders());
}


isExiste(typeComptesName: string) {
  return this.http.get(ConfigService.rootUrl + this._typeComptesUrlIsExiste + '/' + typeComptesName, this.getRequestHeaders());
}
}


