import { Component, Injectable ,OnInit} from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { LoginResponse } from '../../interfaces/responses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  alias: string = '';
  password: string = '';
  responseLogin: LoginResponse = {
    User: {
      alias: "",
      name: "", 
      reference_text: "",
      user_ref: ""
    },
    Hash:"ketchup"
  };

  constructor(private sesionService: SesionService,private router: Router) { }
  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        if (response.Code==200){
          this.router.navigate(['/home']);
        }
        
      }
    );
    
  }

  newPlayer():void{
    this.router.navigate(['/newPlayer']);
  }

  login(): void {

    this.sesionService.login(this.alias.toLowerCase(), this.password).subscribe(
      response => {
        this.responseLogin = response;
        // Manejar la respuesta del servidor (por ejemplo, redireccionar al usuario a otra página)
                
        window.location.reload();
      },
      error => {
        // Manejar el error (por ejemplo, mostrar un mensaje de error al usuario)
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}