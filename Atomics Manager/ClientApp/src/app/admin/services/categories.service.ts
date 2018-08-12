import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';
import { ConfigService } from './config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private router: Router, private http: HttpClient) { }

  private readonly _categoriesUrl: string = '/api/categories';
  private readonly _categoriesUrlIsExiste: string = '/api/categories/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getCategories(): Observable<Categories[]> {
  return this.http.get<Categories[]>(ConfigService.rootUrl + this._categoriesUrl, this.getRequestHeaders());

}

deleteCategories(CategoriesId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._categoriesUrl + '/' + CategoriesId, this.getRequestHeaders());
 }

 addCategories(categories: Categories): Observable<Categories> {
   return this.http.post<Categories>(ConfigService.rootUrl + this._categoriesUrl, JSON.stringify(categories), this.getRequestHeaders());
 }


 updateCategories(categories: Categories): Observable<Categories> {
  return this.http.put<Categories>(ConfigService.rootUrl + this._categoriesUrl + '/' + categories.id, JSON.stringify(categories), this.getRequestHeaders());
}


isExiste(categoriesName: string) {
  return this.http.get(ConfigService.rootUrl + this._categoriesUrlIsExiste + '/' + categoriesName, this.getRequestHeaders());
}
}
