import { Component, OnInit } from '@angular/core';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tips } from '../../../../interfaces/portal';
import { EventService } from '../../../../services/event.service';
import { Router } from '@angular/router';
import { SesionService } from '../../../../services/sesion.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']  // Corrección de 'styleUrl' a 'styleUrls'
})
export class CalendarComponent implements OnInit {


  picker1!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;

  date!: string;
  time!: string;
  url!: string;


  event: Tips = {
    id: "_", url: "",
    type: "youtube",
    content: ''
  };

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.event.author = response.User.alias
        if (!response.User.online) {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.router.navigate(['/home']);
      }
    );
  }



  constructor(private sesionService: SesionService, private dialogEvents: MatSnackBar, private eventService: EventService, private router: Router) { }

  validateDate() {
    const today = new Date();
    const selectedDate = new Date(this.date);

    if (selectedDate < today) {

      this.dialogEvents.open("La fecha no puede ser anterior a la de hoy.", "cerrar");
      this.date = '';  // Reseteamos la fecha si es inválida
    } else {
      this.combineDateTime();
    }
  }

  combineDateTime() {
    if (this.date && this.time) {
      const date = new Date(this.date);
      const [hours, minutes] = this.time.split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);


      this.event.date = date;
    }
  }

  generateUniqueEventId(): string {
    const timestamp = Date.now(); // Obtener la marca de tiempo actual en milisegundos
    
    return `${timestamp}-EVENT`;
  }

  validateNewTips(tips: Tips): boolean {
    const requiredFields: (keyof Tips)[] = ['id', 'title', 'date', 'content', 'url', 'type'];
    return requiredFields.every(field => !!tips[field]);
  }

  makeEvent() {
    this.combineDateTime();
    this.event.id = this.generateUniqueEventId();

    if (!this.validateNewTips(this.event)) {
      this.dialogEvents.open("Por favor completa todos los campos requeridos.", "cerrar");
      return;
    }

    this.eventService.createEvent(this.event).subscribe(
      response => {
        this.dialogEvents.open("Listo!", "cerrar");
        this.router.navigate(['/news']);
      },
      error => {
        this.dialogEvents.open(error['error'], "cerrar");
      }
    );
  }

  makeUrl() {
    if (this.url.length > 0) {


      if (this.url.indexOf("youtu.be") > -1) {
        var idYoutube: string = this.url.split('/')[3]
        var idYoutube = this.url.split('/')[3].split('?')[0]
        this.event.url = "https://www.youtube.com/embed/" + idYoutube;
      } else {
        var idYoutube: string = this.url.split('=')[1]
        idYoutube = idYoutube.split('&').length > 0 ? idYoutube.split('&')[0] : idYoutube
        this.event.url = "https://www.youtube.com/embed/" + idYoutube;
      }


    }

  }
}
