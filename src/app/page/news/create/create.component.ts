import { Component, OnInit } from '@angular/core';
import { Tips } from '../../../interfaces/portal';
import { SesionService } from '../../../services/sesion.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {


  online: boolean = false

  url: string = ""

  newTips: Tips = {
    author: "",
    description: "",
    title: "",
    type: "",
    url: "/assets/img/nosignal.gif"
  }

  cleanUrl() {
    this.url = ""
    this.newTips.url = "/assets/img/nosignal.gif"
  }

  makeUrl() {
    if (this.url.length > 0) {
      if (this.newTips.type == "youtube" && this.url.split('=').length > 0) {
        var idYoutube: string = this.url.split('=')[1]
        idYoutube = idYoutube.split('&').length > 0 ? idYoutube.split('&')[0] : idYoutube
        this.newTips.url = "https://www.youtube.com/embed/" + idYoutube;
      } else {
        this.newTips.url = "/assets/img/nosignal.gif"
      }
    }

  }

  constructor(private sesionService: SesionService) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.newTips.author = response.User.alias
        this.online = response.User.online;
      },
      error => {
        this.online = false
      }
    );
  }




}
