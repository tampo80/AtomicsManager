import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static readonly apiVersion: string = "1";
  public static readonly appVersion: string = "2.5.3";
 public static readonly rootUrl = 'http://localhost:2829';
}
