// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tips } from '../interfaces/portal';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  private loadTips = '/public/loadTips';

  private search = '/public/search';

  private delete = '/public/deleteTip';

  constructor(private http: HttpClient) { }

  getPosts(page: number, limit: number = 10): Observable<Tips[]> {
    return this.http.get<Tips[]>(`${this.loadTips}?page=${page}&limit=${limit}`);
  }

  getPostsFind(page: number, limit: number = 10, search: string = ''): Observable<Tips[]> {
    let url = `${this.search}?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get<Tips[]>(url);
  }

  deletePost(id: string): Observable<void> {
    const sesionHash = window.sessionStorage.getItem('sesionKey') || "";
    var headersInSesion = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE',
      'Authorization': sesionHash
    };

    const url = `${this.delete}`;
    

    return this.http.delete<void>(url, { body: { id } ,headers: new HttpHeaders(headersInSesion)});
  }
}

