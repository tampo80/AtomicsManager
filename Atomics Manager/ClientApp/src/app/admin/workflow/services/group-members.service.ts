import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs/Observable';
import { GroupMembers } from '../models/group-members';

@Injectable({
  providedIn: 'root'
})
export class GroupMembersService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _groupMembersUrl: string = '/api/groupmembers';
  private readonly _groupMembersUrlIsExiste: string = '/api/groupmembers/Isavailable';


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getGroupMembers(): Observable<GroupMembers[]> {
  return this.http.get<GroupMembers[]>(ConfigService.rootUrl + this._groupMembersUrl, this.getRequestHeaders());

}

getGroupMembersByAPLId(id?: number): Observable<GroupMembers[]> {
  return this.http.get<GroupMembers[]>(ConfigService.rootUrl + this._groupMembersUrl + '/' + id, this.getRequestHeaders());

}

deleteGroupMembers(GroupMembersId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._groupMembersUrl + '/' + GroupMembersId, this.getRequestHeaders());
 }

 addGroupMembers(groupMembers: any): Observable<GroupMembers> {
   return this.http.post<GroupMembers>(ConfigService.rootUrl + this._groupMembersUrl, JSON.stringify(groupMembers), this.getRequestHeaders());
 }


 updateGroupMembers(groupMembers: GroupMembers): Observable<GroupMembers> {
  return this.http.put<GroupMembers>(ConfigService.rootUrl + this._groupMembersUrl + '/' + groupMembers.id, JSON.stringify(groupMembers), this.getRequestHeaders());
}


isExiste(groupMembersName: string) {
  return this.http.get(ConfigService.rootUrl + this._groupMembersUrlIsExiste + '/' + groupMembersName, this.getRequestHeaders());
}
}


