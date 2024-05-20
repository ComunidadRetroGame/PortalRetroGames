import { Component, OnInit } from '@angular/core';
import { Tips } from '../../interfaces/portal';
import { SesionService } from '../../services/sesion.service';
import { PortalService } from '../../services/portal.service';
import { Title} from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  online: boolean = false

  tips: Tips[] =[]

  author : string = ""

  constructor(private sesionService: SesionService, private portalService : PortalService,private titleService: Title) {
    
  }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.online = response.User.online;
        this.author = response.User.alias;
        this.portalService.getTips().subscribe(
          response => {
    
            response.forEach(player => {
    
              this.tips.push(player)
    
            })
          }
        );

      },
      error => {
        this.online = false
      }
    );
  }

}
