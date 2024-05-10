import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, UserRetro, UserRetroOnline } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private baseUrl: string = 'http://localhost';

  headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };


  constructor(private http: HttpClient) { }

  login(alias: string, password: string): Observable<any> {
    const body = { alias: alias, password: password };
    var httpOptions = { headers: new HttpHeaders(this.headers), }
    return this.http.post<LoginResponse>(`${this.baseUrl}/portal/login`, body, httpOptions);
  }

  sesionOnline(): Observable<UserRetroOnline> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };

    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    
    return this.http.get<UserRetroOnline>(`${this.baseUrl}/portal/isOnline`, httpOptions);
  }
}
