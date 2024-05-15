import { Component } from '@angular/core';
import { PortalService } from '../../../services/portal.service';
import { Router } from '@angular/router';
import { UserRetro } from '../../../interfaces/responses';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }
  
  showForm: boolean = false;

  perfect: boolean = false;

  userRef: UserRetro = {}

  confirmPassword: string = ""

  code: string = ""

  newUser: UserRetro = {}

  constructor(private portalService: PortalService, private router: Router,private dialogEvents: MatSnackBar
  ) { }
  checkAlias() {
    this.portalService.checkAlias(this.newUser).subscribe(
      response => {

        this.showForm = response.RRSS == null

        if (!this.showForm) {
          this.dialogEvents.open(" Este Usuario ya existe!", "cerrar", this.configDialog);window.scrollTo(0, document.body.scrollHeight);
        }

      }
    );
  }
  //Crea un usuario nuevo
  esRecomendado() {
    this.portalService.checkNewUser(this.code).subscribe(
      response => {
        this.perfect = response.reference_text == this.code
        this.userRef = response

      }
    );
  }
  makeUser() {

    if (this.confirmPassword != this.newUser.password) {
      this.dialogEvents.open("Las contraseñas no coinciden!")
    } else {

      this.portalService.makeUser(this.newUser,this.userRef,this.code).subscribe(
        response => {

          if (response.user_ref == this.userRef.alias){
            this.dialogEvents.open("Bienvenido, ahora intenta logear con tus credenciales!")
            this.router.navigate(['/home']);
          }

        }
      );
    }
  }


}
