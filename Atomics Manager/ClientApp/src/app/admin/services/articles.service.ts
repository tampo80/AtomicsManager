import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Articles } from '../models/articles';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private router: Router, private http: HttpClient) { }


  private readonly _articlesUrl: string = "/api/product";
  private readonly _articlesUrlIsExiste: string = "/api/product/Isavailable";



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getArticles():Observable<Articles[]> {
  return this.http.get<Articles[]>(ConfigService.rootUrl+this._articlesUrl,this.getRequestHeaders());

}

getArticlesByPaysId(id?:number):Observable<Articles[]> {
  return this.http.get<Articles[]>(ConfigService.rootUrl+this._articlesUrl+"/bypaysid/"+id,this.getRequestHeaders());

}

deleteArticles(ArticlesId?:number):Observable<{}>{

  return this.http.delete(ConfigService.rootUrl+this._articlesUrl+"/"+ArticlesId,this.getRequestHeaders());
 }

 addArticles(articles:FormData):Observable<HttpEvent<any>>{

   const req=new HttpRequest('POST',ConfigService.rootUrl+this._articlesUrl,articles,{

    reportProgress:true
   });

   return this.http.request(req);
 };


 updateArticles(articles:FormData,id:any):Observable<HttpEvent<any>>{

  const req=new HttpRequest('PUT',ConfigService.rootUrl+this._articlesUrl+"/"+id,articles,{

   reportProgress:true
  });

  return this.http.request(req);
};

isExiste(articlesName:string)
{
  return this.http.get(ConfigService.rootUrl+this._articlesUrlIsExiste+"/"+articlesName,this.getRequestHeaders());
}
}


