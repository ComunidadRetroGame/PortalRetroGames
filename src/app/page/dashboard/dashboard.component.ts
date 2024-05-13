
import { Component, Injectable, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { Router } from '@angular/router';
import { ChangePassword, RRSS, UserRetro } from '../../interfaces/responses';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  showDashboard : boolean = false;

  player: UserRetro = {}

  rrss_player: RRSS = {}

  changePassword: ChangePassword = {
    password: "",
    password_new: "",
    password_confirm_new: ""
  }

  constructor(private sesionService: SesionService, private router: Router) { }

  doChangePassword() {

    if (this.changePassword.password_confirm_new!=this.changePassword.password_new){
      alert("Las password no coinciden");
    }

    this.sesionService.changePassword(this.changePassword).subscribe(
      response => {
        this.player = response.User;
        alert("Password cambiada");
      },
      error => {
        this.router.navigate(['/home']);
      }
    );
  }


  ngOnInit(): void {
    this.sesionService.userData().subscribe(
      response => {
        this.player = response;
        console.log(JSON.stringify(response));
        if (this.player.name == "") {
          
          this.router.navigate(['/home']);
        }else{
          this.showDashboard=true;
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
