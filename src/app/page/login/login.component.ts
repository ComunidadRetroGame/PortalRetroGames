import { Component, Injectable, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { LoginResponse } from '../../interfaces/responses';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  preventSpace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }

    this.alias = this.alias?.trim()
  }

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  alias: string = '';
  password: string = '';
  responseLogin: LoginResponse = {
    User: {
      alias: "",
      name: "",
      reference_text: "",
      user_ref: ""
    },
    Hash: "ketchup"
  };


  constructor(private sesionService: SesionService, private router: Router, private dialogEvents: MatSnackBar) { }
  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        if (response.Code == 200) {
          this.router.navigate(['/home']);
        }

      }
    );

  }

  newPlayer(): void {
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
        this.dialogEvents.open("Usted no es de aca cierto?", "cerrar", this.configDialog);
      }
    );
  }
}