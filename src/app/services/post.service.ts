// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetroComment, Tips } from '../interfaces/portal';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private loadTips = '/public/loadTips';

  private loadTipsByPerfil = '/public/loadTipsByPerfil';



  private search = '/public/search';

  private delete = '/portal/deleteTips';

  private send = '/portal/comment';

  constructor(private http: HttpClient) { }

  comment(comment: RetroComment): Observable<RetroComment[]> {

    comment.date = new Date();

    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";

    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Authorization': sesionHash
    };

    var httpOptions = { headers: new HttpHeaders(headersInSesion), }
    return this.http.post<RetroComment[]>(`${this.send}`, comment, httpOptions);
  }

  getPostsByAlias(alias: string, page: number, limit: number = 10, typeOfTips: string[] = ['videos', 'url', 'tips']): Observable<Tips[]> {


    var headersInCriteria = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'typeOfTips': typeOfTips
    };

    var httpOptions = { headers: new HttpHeaders(headersInCriteria), }

    return this.http.get<Tips[]>(`${this.loadTipsByPerfil}?page=${page}&limit=${limit}&alias=${alias}`, httpOptions);
  }

  getPosts(page: number, limit: number = 10, typeOfTips: string[] = ['youtube', 'url', 'tips']): Observable<Tips[]> {

    var headersInCriteria = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'typeOfTips': typeOfTips
    };

    var httpOptions = { headers: new HttpHeaders(headersInCriteria), }

    return this.http.get<Tips[]>(`${this.loadTips}?page=${page}&limit=${limit}`, httpOptions);
  }


  getPostsFind(page: number, limit: number = 10, search: string = '', typeOfTips: string[] = ['videos', 'url', 'tips']): Observable<Tips[]> {
    let url = `${this.search}?page=${page}&limit=${limit}`;

    var headersInCriteria = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'typeOfTips': typeOfTips
    };

    var httpOptions = { headers: new HttpHeaders(headersInCriteria), }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get<Tips[]>(url,httpOptions);
  }

  deletePost(id: string): Observable<void> {
    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";
    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE',
      'Authorization': sesionHash,
    };

    const url = `${this.delete}`;


    return this.http.delete<void>(url, { body: { id }, headers: new HttpHeaders(headersInSesion) });
  }
}

