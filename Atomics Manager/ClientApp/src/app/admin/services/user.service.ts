import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';
import { LoginResponse, IdToken } from '../models/login-response.model';
import { DbKeyService } from './db-key.service';
import { JwtHelperService } from './jwt-helper.service';
import { PermissionValues } from '../models/permission.model';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {

  readonly rootUrl = ConfigService.rootUrl;
  constructor(private http: HttpClient) { }


userAuthentication(userName, password) {

  const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'  });

  const params = new HttpParams()
    .append('username', userName)
    .append('password', password)
    .append('grant_type', 'password')
    .append('scope', 'openid email phone profile offline_access roles')
    .append('resource', window.location.origin);

  const requestBody = params.toString();

  return this.http.post(this.rootUrl + '/connect/token', requestBody, { headers: header });
  }

   saveUserData(response: LoginResponse) {

    localStorage.setItem(DbKeyService.ID_TOKEN, response.id_token);
    localStorage.setItem(DbKeyService.REFRESH_TOKEN, response.refresh_token);
    localStorage.setItem(DbKeyService.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(DbKeyService.TOKEN_EXPIRES_IN, response.expires_in.toString());
    const jwtHelper = new JwtHelperService();

    const decodedIdToken = <IdToken>jwtHelper.decodeToken(response.id_token);

    const user = new User(
      decodedIdToken.sub,
      decodedIdToken.name,
      decodedIdToken.fullname,
      decodedIdToken.email,
      decodedIdToken.jobtitle,
      decodedIdToken.phone,
      Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role]);
    user.isEnabled = true;

    localStorage.setItem(DbKeyService.CURRENT_USER, JSON.stringify(user));


    const permissions: PermissionValues[] = Array.isArray(decodedIdToken.permission) ? decodedIdToken.permission : [decodedIdToken.permission];

    localStorage.setItem(DbKeyService.USER_PERMISSIONS, JSON.stringify(permissions));
  }

   logout() {
    localStorage.removeItem(DbKeyService.ID_TOKEN);
    localStorage.removeItem(DbKeyService.REFRESH_TOKEN);
    localStorage.removeItem(DbKeyService.ACCESS_TOKEN);
    localStorage.removeItem(DbKeyService.TOKEN_EXPIRES_IN);
    localStorage.removeItem(DbKeyService.CURRENT_USER);
    localStorage.removeItem(DbKeyService.USER_PERMISSIONS);
    localStorage.removeItem('userToken');
  }


  public get currentUser(): User {

    const user = <User>JSON.parse(localStorage.getItem(DbKeyService.CURRENT_USER));

    let currentUser = new User();
    if (user != null) {
      currentUser = new User(user.id, user.userName, user.fullName, user.email, user.jobTitle, user.phoneNumber, user.roles);
    }
    return currentUser;
  }


  public get currentUserPermissions (): string[] {
    let permissionValues = [];
        permissionValues = <string[]>JSON.parse(localStorage.getItem(DbKeyService.USER_PERMISSIONS));
    return permissionValues;
  }


  public get user_token(): string {
    const user_token = localStorage.getItem('userToken');
    return user_token;
  }


}
