import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userName: string = ""
  about: string = ""

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition:'top'
  }

  constructor(private sesionService: SesionService, private router: Router, private dialogEvents: MatSnackBar) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      userOnline => {
        this.userName = userOnline.User.alias;

        if (userOnline.Code == 200) {

          this.sesionService.userData().subscribe(
            userRetro => {
              this.userName = userRetro.name || ""
              this.about = userRetro.about_me || ""
              if (this.userName == "") {
                this.dialogEvents.open("Debe completar su perfil!", "cerrar", this.configDialog);window.scrollTo(0, document.body.scrollHeight);
                this.router.navigate(['/dashboard']);
              }
            }
          );
        }
      },
      error => {
        this.userName = ""
      }
    );
  }



}


