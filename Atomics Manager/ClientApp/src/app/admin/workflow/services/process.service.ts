import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Process } from '../models/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private router: Router, private http: HttpClient) { }

  private readonly _processUrl: string = '/api/process';
  private readonly _processUrlIsExiste: string = '/api/process/Isavailable';



  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v${ConfigService.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': ConfigService.appVersion
    });

    return { headers: headers };
}

getProcess(): Observable<Process[]> {
  return this.http.get<Process[]>(ConfigService.rootUrl + this._processUrl, this.getRequestHeaders());

}

deleteProcess(ProcessId?: number): Observable<{}> {

  return this.http.delete(ConfigService.rootUrl + this._processUrl + '/' + ProcessId, this.getRequestHeaders());
 }

 addProcess(process: Process): Observable<Process> {
   return this.http.post<Process>(ConfigService.rootUrl + this._processUrl, JSON.stringify(process), this.getRequestHeaders());
 }


 updateProcess(process: Process): Observable<Process> {
  return this.http.put<Process>(ConfigService.rootUrl + this._processUrl + '/' + process.id, JSON.stringify(process), this.getRequestHeaders());
}


isExiste(processName: string) {
  return this.http.get(ConfigService.rootUrl + this._processUrlIsExiste + '/' + processName, this.getRequestHeaders());
}
}


