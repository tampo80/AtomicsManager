import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) { }

  getImage(imageUrl: string): Observable<string> {
    return this.httpClient.get<string>(imageUrl);
  }

}
