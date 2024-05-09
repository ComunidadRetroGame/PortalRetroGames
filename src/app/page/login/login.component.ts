import { Component, Injectable } from '@angular/core';
import { SesionService } from '../../services/sesion.service';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent {
  alias: string = '';
  password: string = '';

  constructor(private sesionService: SesionService) { }

  login(): void {
    this.sesionService.login(this.alias, this.password).subscribe(
      response => {
        // Manejar la respuesta del servidor (por ejemplo, redireccionar al usuario a otra página)
        console.log('Inicio de sesión exitoso:', response);
      },
      error => {
        // Manejar el error (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}