import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class MobileHomeComponent {

  signal: string = "/assets/img/nosignal.gif";


  refresh() {
    this.signal = "/assets/img/nosignal.gif";
  }
  
  web() {

  }
  tips() {

  }
  youtube() {
    this.signal = "https://www.youtube.com/embed/FrxDvI6vmAg?si=RV_TZM0r7EUI-Jz3"
  }

}
