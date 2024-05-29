import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tips } from '../interfaces/portal';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'events'; // Adjust this URL as needed

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Tips[]> {
    return this.http.get<Tips[]>(this.apiUrl);
  }

  createEvent(event: Tips): Observable<Tips> {
    return this.http.post<Tips>(this.apiUrl, event);
  }
}
