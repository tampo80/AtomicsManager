import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApgMembers } from '../models/apg-members';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgMembersService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _apgMembersUrl: string = '/api/apgMembers';
  private readonly _apgMembersUrlIsExiste: string = '/api/apgMembers/Isavailable';


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getApgMembers(): Observable<ApgMembers[]> {
  return this.http.get<ApgMembers[]>(ConfigService.rootUrl + this._apgMembersUrl, this.getRequestHeaders());

}

getApgMembersByAPLId(id?: number): Observable<ApgMembers[]> {
  return this.http.get<ApgMembers[]>(ConfigService.rootUrl + this._apgMembersUrl + '/' + id, this.getRequestHeaders());

}

deleteApgMembers(ApgMembersId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._apgMembersUrl + '/' + ApgMembersId, this.getRequestHeaders());
 }

 addApgMembers(apgMembers: any): Observable<ApgMembers> {
   return this.http.post<ApgMembers>(ConfigService.rootUrl + this._apgMembersUrl, JSON.stringify(apgMembers), this.getRequestHeaders());
 }


 updateApgMembers(apgMembers: ApgMembers): Observable<ApgMembers> {
  return this.http.put<ApgMembers>(ConfigService.rootUrl + this._apgMembersUrl + '/' + apgMembers.id, JSON.stringify(apgMembers), this.getRequestHeaders());
}


isExiste(apgMembersName: string) {
  return this.http.get(ConfigService.rootUrl + this._apgMembersUrlIsExiste + '/' + apgMembersName, this.getRequestHeaders());
}
}


