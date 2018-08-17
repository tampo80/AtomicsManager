import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs';
import { Group } from '../models/group';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _groupUrl: string = '/api/group';
  private readonly _groupUrlIsExiste: string = '/api/group/Isavailable';


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getGroup(): Observable<Group[]> {
  return this.http.get<Group[]>(ConfigService.rootUrl + this._groupUrl, this.getRequestHeaders());

}

getExpertGroup(): Observable<Group[]> {
  return this.http.get<Group[]>(ConfigService.rootUrl + this._groupUrl + '/expertise', this.getRequestHeaders());

}

getGroupByPaysId(id?: number): Observable<Group[]> {
  return this.http.get<Group[]>(ConfigService.rootUrl + this._groupUrl + '/bypaysid/' + id, this.getRequestHeaders());

}

deleteGroup(GroupId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._groupUrl + '/' + GroupId, this.getRequestHeaders());
 }

 addGroup(group: Group): Observable<Group> {
   return this.http.post<Group>(ConfigService.rootUrl + this._groupUrl, JSON.stringify(group), this.getRequestHeaders());
 }


 updateGroup(group: Group): Observable<Group> {
  return this.http.put<Group>(ConfigService.rootUrl + this._groupUrl + '/' + group.id, JSON.stringify(group), this.getRequestHeaders());
}


isExiste(groupName: string) {
  return this.http.get(ConfigService.rootUrl + this._groupUrlIsExiste + '/' + groupName, this.getRequestHeaders());
}
}


