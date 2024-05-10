import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private baseUrl = 'http://localhost:3030'; 

  constructor(private http: HttpClient) { }

  login(alias: string, password: string): Observable<any> {
    // Construir el cuerpo de la solicitud con los datos de inicio de sesión
    const body = { alias: alias, password: password };

    // Realizar la solicitud HTTP POST al servidor Go
    return this.http.post<any>(`${this.baseUrl}/portal/login`, body);
  }
}
