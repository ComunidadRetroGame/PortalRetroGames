import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePassword, LoginResponse, UserRetro, UserRetroOnline } from '../interfaces/responses';
import { Tips } from '../interfaces/portal';
@Injectable({
  providedIn: 'root'
})
export class PortalService {



  private baseUrl: string = '';

  headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };


  constructor(private http: HttpClient) { }

  getTeam(): Observable<UserRetro[]> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };

    var httpOptions = { headers: new HttpHeaders(headersInSesion), }

    return this.http.get<UserRetro[]>(`${this.baseUrl}/public/team`, httpOptions);
  }
  
  checkAlias(newUser: UserRetro): Observable<UserRetro> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";


    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };
    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    return this.http.post<UserRetro>(`${this.baseUrl}/public/checkAlias`, newUser, httpOptions);
  }

  checkNewUser(code: string): Observable<UserRetro> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var body: any = {
      "password": code,
      "alias": sesionHash
    }

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };
    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    return this.http.post<UserRetro>(`${this.baseUrl}/public/checkCode`, body, httpOptions);
  }

  makeUser(newUser: UserRetro, refUser: UserRetro, code: string): Observable<UserRetro> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var body: any = {
      "new": newUser,
      "ref": refUser,
      "code": code
    }

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };
    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    return this.http.post<UserRetro>(`${this.baseUrl}/public/createUser`, body, httpOptions);
  }

  getTips(): Observable<Tips[]> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };

    var httpOptions = { headers: new HttpHeaders(headersInSesion), }

    return this.http.get<Tips[]>(`${this.baseUrl}/public/tips`, httpOptions);
  }

  saveTips(body : Tips): Observable<Tips> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };
    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    return this.http.post<Tips>(`${this.baseUrl}/portal/saveTips`, body, httpOptions);
  }

  getTip(id : string): Observable<Tips> {

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";
  
    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };
  
    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
  
    return this.http.get<Tips>(`${this.baseUrl}/public/new?id=${id}`, httpOptions);
  }
  
}

