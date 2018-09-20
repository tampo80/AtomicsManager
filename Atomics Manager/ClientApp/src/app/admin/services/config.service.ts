import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static readonly apiVersion: string = '1';
  public static readonly appVersion: string = '2.5.3';
  public static readonly rootUrl = environment.baseUrl;
  public static readonly Devise = 'FCFA';
}
