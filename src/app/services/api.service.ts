import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  post(url,data): Observable<any>{
    return this.http.post(url,data);
  }

  get(url): Observable<any>{
    return this.http.get(url);
  }
  testGet(url,header):Observable<any>{
    return this.http.get(url,header);
  }
}
