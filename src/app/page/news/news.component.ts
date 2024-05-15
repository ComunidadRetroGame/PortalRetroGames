import { Component, OnInit } from '@angular/core';
import { Tips } from '../../interfaces/portal';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  online:boolean=false

  tips: Tips = {
    author: "DoctorRetroTV", 
    description: "Este es el mejor video de la vida!!", 
    title: "Tremendo video", 
    type: "youtube", 
    url: "https://www.youtube.com/embed/wYcup9Jg0qE?si=HYAk_UdaYHBB7Fxs"
    //https://www.youtube.com/watch?v=wYcup9Jg0qE
  }

  constructor(private sesionService: SesionService) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.online = response.User.online;
      },
      error => {
        this.online=false
      }
    );
  }

}
