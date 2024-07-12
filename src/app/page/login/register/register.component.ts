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
  reDo() {
    this.newUser.alias=""
    this.showForm=false;
  }

  toLowerCase(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
    this.newUser.alias =input.value;
  }

  configDialog: MatSnackBarConfig = {
    duration: 1000, verticalPosition: 'top'
  }

  showForm: boolean = false;

  perfect: boolean = false;

  userRef: UserRetro = {}

  confirmPassword: string = ""

  code: string = ""

  newUser: UserRetro = {}

  constructor(private portalService: PortalService, private router: Router, private dialogEvents: MatSnackBar
  ) { }
  checkAlias() {
    this.portalService.checkAlias(this.newUser).subscribe(
      response => {

        this.showForm = response.RRSS == null

        if (!this.showForm) {
          this.dialogEvents.open(" Este Usuario ya existe!", "cerrar", this.configDialog);
        }

      }
    );
  }
  //Crea un usuario nuevo
  esRecomendado() {
    if (this.code.trim()!=""){
    this.portalService.checkNewUser(this.code).subscribe(
      response => {
        this.perfect = response.reference_text == this.code
        this.userRef = response

      }
    );
  }else{
    this.dialogEvents.open("Si no sabes cual, mejor retirate", "cerrar", this.configDialog);
  }
  }
  makeUser() {

    if (this.confirmPassword != this.newUser.password) {
      this.dialogEvents.open("Las contraseñas no coinciden!")
    } else {

      this.portalService.makeUser(this.newUser, this.userRef, this.code).subscribe(
        response => {

          if (response.user_ref == this.userRef.alias) {
            this.dialogEvents.open("Bienvenido, ahora intenta logear con tus credenciales!")
            this.router.navigate(['/home']);
          }

        }
      );
    }
  }

  preventSpace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }

    this.newUser.alias = this.newUser.alias?.trim()
  }

}
