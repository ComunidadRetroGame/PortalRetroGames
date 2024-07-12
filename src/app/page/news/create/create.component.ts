import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Tips } from '../../../interfaces/portal';
import { SesionService } from '../../../services/sesion.service';
import { Router } from '@angular/router';
import { PortalService } from '../../../services/portal.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  MAX_TIPS_CONTENT: number = 450000;


  onChangedEditor(event: any): void {
    if (event.html) {
      window.localStorage.setItem("newTips", JSON.stringify(this.newTips))
    }
  }

  constructor(private sesionService: SesionService, private router: Router, private portalService: PortalService, private dialogEvents: MatSnackBar) {

    if (this.newTips != undefined) {
      this.isEdit = true;
    } else {
      this.cleanTips();
    }
  }

  isEdit: boolean = false;

  online: boolean = false

  url: string = ""

  @Input() newTips!: Tips;

  cleanTips() {
    this.newTips = {
      id: "",
      author: "",
      content: "",
      title: "",
      type: "",
      url: "/assets/img/nosignal.gif"
    }
  }

  setTips() {
    if (this.newTips.type == "youtube") {
      this.newTips.title = ""
      this.newTips.content = ""
      this.cleanUrl();
    }

    if (this.newTips.type == "tips") {
      this.newTips.content = ""
      window.localStorage.setItem("newTips", JSON.stringify(this.newTips))
      this.newTips.url = "/#/notice?id=new"
    }

    if (this.newTips.type == "url") {
      this.newTips.content = ""
      this.newTips.title = ""
      this.newTips.url = ""
    }

  }



  cleanUrl() {
    this.url = ""
    this.newTips.url = "/assets/img/nosignal.gif"
  }

  makeUrl() {
    if (this.url.length > 0) {

      if (this.newTips.type == "youtube" && this.url.split('=').length > 0) {
        
        var idYoutube: string = ""
        
        if (this.url.indexOf("shorts") > -1 || this.url.indexOf("live") > -1) {
            //https://youtube.com/shorts/hLzj3wMmmRw?feature=share  
            idYoutube = this.url.split('/')[4].split('?')[0]
        } else {

          if (this.url.indexOf("youtu.be") > -1) {            
            idYoutube = this.url.split('/')[3].split('?')[0]
          } else {
            idYoutube = this.url.split('=')[1]
            idYoutube = idYoutube.split('&').length > 0 ? idYoutube.split('&')[0] : idYoutube
          }
        }
        this.newTips.url = "https://www.youtube.com/embed/" + idYoutube;
      } else {
        this.newTips.url = "/assets/img/nosignal.gif"
      }
    }

  }


  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {

        this.newTips.author = response.User.alias
        this.online = response.User.online;


      },
      error => {
        this.online = false
        this.router.navigate(['/home']);
      }
    );
  }

  getCurrentFormattedDate(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  validateNewTips(tips: Tips): boolean {
    const requiredFields: (keyof Tips)[] = ['id', 'title', 'date', 'content', 'url', 'type'];
    return requiredFields.every(field => !!tips[field]);
  }

  crearTips() {

    if (this.newTips.id == "") {
      this.newTips.id = this.generateUniqueId();
    }
    this.newTips.date = new Date();//this.getCurrentFormattedDate();

    if (this.newTips.type == "tips") {
      this.newTips.url = "/#/notice?id=" + this.newTips.id
    }
    if (!this.validateNewTips(this.newTips)) {
      this.dialogEvents.open("Por favor completa todos los campos requeridos.", "cerrar");
      return;
    }


    if (this.newTips.content.length >= this.MAX_TIPS_CONTENT) {
      this.dialogEvents.open("Creo que las imagenes que subistes son muy grandes para poder guardar tu noticia, por favor escoge algunas mas pequeñas", "cerrar", this.configDialog);
    } else {
      this.portalService.saveTips(this.newTips).subscribe(
        response => {
          this.dialogEvents.open("Listo!", "cerrar", this.configDialog);
          this.router.navigate(['/news']);
        },
        error => {
          this.dialogEvents.open(error['error'], "cerrar", this.configDialog);
        }
      );
    }
  }

  generateUniqueId(): string {
    const timestamp = Date.now(); // Obtener la marca de tiempo actual en milisegundos
    const randomSuffix = Math.random().toString(36).substr(2, 9); // Generar un sufijo aleatorio
    return `${timestamp}-${randomSuffix}`;
  }


}
