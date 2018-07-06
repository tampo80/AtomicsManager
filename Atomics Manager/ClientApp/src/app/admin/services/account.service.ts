import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {GlobalErrorInterceptor} from "../interceptors/global-error.interceptor";
import { catchError } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserEdit } from '../models/user-edit.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    private readonly _usersUrl: string = "/api/account/users";
    private readonly _userByUserNameUrl: string = "/api/account/users/username";
    private readonly _currentUserUrl: string = "/api/account/users/me";
    private readonly _currentUserPreferencesUrl: string = "/api/account/users/me/preferences";
    private readonly _unblockUserUrl: string = "/api/account/users/unblock";
    private readonly _rolesUrl: string = "/api/account/roles";
    private readonly _roleByRoleNameUrl: string = "/api/account/roles/name";
    private readonly _permissionsUrl: string = "/api/account/permissions";
    private handleError: GlobalErrorInterceptor;

  constructor(private router: Router, private http: HttpClient,private userService:UserService) {


   
   }


  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userService.user_token,
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}


   getUsers():Observable<User[]> {
    return this.http.get<User[]>(ConfigService.rootUrl+this._usersUrl,this.getRequestHeaders());
                    
                    
}


getPermisions():Observable<Permission[]> {
  return this.http.get<Permission[]>(ConfigService.rootUrl+this._permissionsUrl,this.getRequestHeaders());
                  
                  
}

 getUser(userId:string):Observable<{}> {
  return this.http.get<User>(ConfigService.rootUrl+this._usersUrl+"/"+userId,this.getRequestHeaders());
}


getUserByName(userName:string):Observable<{}> {
  return this.http.get<User>(ConfigService.rootUrl+this._userByUserNameUrl+"/"+userName,this.getRequestHeaders());
}


   deleteUser(UserId?:string):Observable<{}>{

    return this.http.delete(ConfigService.rootUrl+this._usersUrl+"/"+UserId,this.getRequestHeaders());
   }

   addUser(user:UserEdit):Observable<UserEdit>{
     return this.http.post<UserEdit>(ConfigService.rootUrl+this._usersUrl,JSON.stringify(user),this.getRequestHeaders());
   };


   updateUser(user:UserEdit):Observable<UserEdit>{
    return this.http.put<UserEdit>(ConfigService.rootUrl+this._usersUrl+"/"+user.id,JSON.stringify(user),this.getRequestHeaders());
  };

  resetUserPassword(user:UserEdit):Observable<UserEdit>{
    return this.http.put<UserEdit>(ConfigService.rootUrl+this._usersUrl+"/resetuserpassword/"+user.id,JSON.stringify(user),this.getRequestHeaders());
  };

  //roles management

getRoles():Observable<Role[]>{

  return this.http.get<Role[]>(ConfigService.rootUrl+this._rolesUrl,this.getRequestHeaders());
}


getRolesByUserName(userName:string):Observable<Role[]>{

  return this.http.get<Role[]>(ConfigService.rootUrl+this._roleByRoleNameUrl+'/'+userName,this.getRequestHeaders());
}

deleteRoles(roleId?:string):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._rolesUrl+"/"+roleId,this.getRequestHeaders());
 }


 addRole(role:Role):Observable<Role>{
  return this.http.post<Role>(ConfigService.rootUrl+this._rolesUrl,JSON.stringify(role),this.getRequestHeaders());
};

editRole(role:Role):Observable<Role>{
  return this.http.put<Role>(ConfigService.rootUrl+this._rolesUrl+"/"+role.id,JSON.stringify(role),this.getRequestHeaders());
};

}
