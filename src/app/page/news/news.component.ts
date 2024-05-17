import { Component, OnInit } from '@angular/core';
import { Tips } from '../../interfaces/portal';
import { SesionService } from '../../services/sesion.service';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  online: boolean = false

  tips: Tips[] =[]

  constructor(private sesionService: SesionService, private portalService : PortalService) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.online = response.User.online;
        this.portalService.getTips().subscribe(
          response => {
    
            response.forEach(tip => {
    
              this.tips.push(tip)
    
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
