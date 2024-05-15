
import { Component, Injectable, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { Router } from '@angular/router';
import { ChangePassword, Player_RRSS, RRSS, UserRetro } from '../../interfaces/responses';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  configDialog: MatSnackBarConfig = {
    duration: 1000000, verticalPosition: 'top'
  }

  showDashboard: boolean = false;

  player: UserRetro = {}

  rrss_player: RRSS = {}

  changePassword: ChangePassword = {
    password: "",
    password_new: "",
    password_confirm_new: ""
  }

  constructor(private sesionService: SesionService, private router: Router, private dialogEvents: MatSnackBar) { }

  doChangePassword() {

    if (this.changePassword.password_confirm_new != this.changePassword.password_new) {
      this.dialogEvents.open("Las password no coinciden", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);
    } else {
      this.sesionService.changePassword(this.changePassword).subscribe(
        response => {
          this.player = response.User;
          this.dialogEvents.open("Password cambiada", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);
        },
        error => {
          this.dialogEvents.open("algo malio sal", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);
        }
      );
    }
  }


  saveProfile() {

    if (!this.validUser()) {
      this.dialogEvents.open("algo malio sal", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);

    } else {
      var rrss: Player_RRSS[] = [
        { type: "youtube", URL: this.rrss_player.youtube || "" },
        { type: "twitch", URL: this.rrss_player.twitch || "" },
        { type: "twitter", URL: this.rrss_player.twitter || "" },
        { type: "instagram", URL: this.rrss_player.instagram || "" },
        { type: "email", URL: this.rrss_player.email || "" },
        { type: "reddit", URL: this.rrss_player.reddit || "" },
        { type: "other", URL: this.rrss_player.other || "" }
      ];

      this.player.RRSS = rrss;

      this.sesionService.saveProfile(this.player).subscribe(
        response => {
          this.dialogEvents.open("Listo!", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);;
        },
        error => {
          this.dialogEvents.open("algo malio sal", "cerrar", this.configDialog); window.scrollTo(0, document.body.scrollHeight);
        }
      );
    }
  }
  validUser(): boolean {
    return true;
  }


  ngOnInit(): void {
    this.sesionService.userData().subscribe(
      response => {
        this.player = response;
        this.player.RRSS?.forEach(rrss => {

          if (rrss.type == "youtube") {
            this.rrss_player.youtube = rrss.URL;
          }
          if (rrss.type == "twitch") {
            this.rrss_player.twitch = rrss.URL;
          }
          if (rrss.type == "twitter") {
            this.rrss_player.twitter = rrss.URL;
          }
          if (rrss.type == "instagram") {
            this.rrss_player.instagram = rrss.URL;
          }
          if (rrss.type == "email") {
            this.rrss_player.email = rrss.URL;
          }
          if (rrss.type == "reddit") {
            this.rrss_player.reddit = rrss.URL;
          }
          if (rrss.type == "other") {
            this.rrss_player.other = rrss.URL;
          }
        })

        if (this.player.alias == "") {

          this.router.navigate(['/home']);
        } else {
          this.showDashboard = true;
        }
      },
      error => {
        this.router.navigate(['/home']);
      }
    );
  }
  title = 'Mi Perfil';

  logout() {
    this.sesionService.logout().subscribe(
      response => {
        window.location.reload();
      }
    );
  }

}
