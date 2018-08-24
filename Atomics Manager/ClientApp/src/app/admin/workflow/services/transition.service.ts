import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { Observable } from 'rxjs';
import { Transition } from '../models/transition';
import { TransitionAction } from '../models/transition-action';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  constructor(private router: Router, private http: HttpClient) { }

  private readonly _transitionUrl: string = '/api/transition';
  private readonly _transitionUrlIsExiste: string = '/api/transition/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getTransition(): Observable<Transition[]> {
  return this.http.get<Transition[]>(ConfigService.rootUrl + this._transitionUrl, this.getRequestHeaders());

}

getTransitionAction(): Observable<TransitionAction[]> {
  return this.http.get<TransitionAction[]>(ConfigService.rootUrl + this._transitionUrl + '/transitionaction'  , this.getRequestHeaders());

}

deleteTransition(TransitionId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._transitionUrl + '/' + TransitionId, this.getRequestHeaders());
 }

 addTransition(transition: Transition): Observable<Transition> {
   return this.http.post<Transition>(ConfigService.rootUrl + this._transitionUrl, JSON.stringify(transition), this.getRequestHeaders());
 }


 updateTransition(transition: Transition): Observable<Transition> {
  return this.http.put<Transition>(ConfigService.rootUrl + this._transitionUrl + '/' + transition.id, JSON.stringify(transition), this.getRequestHeaders());
}


isExiste(transitionName: string) {
  return this.http.get(ConfigService.rootUrl + this._transitionUrlIsExiste + '/' + transitionName, this.getRequestHeaders());
}
}


