import {  Component, OnInit, ViewChild } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  online: boolean = false

  author : string = ""

  showList : boolean=false;

  @ViewChild(ListComponent) listTips!: ListComponent;

  constructor(private sesionService: SesionService) {

  }


  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.online = response.User.online;
        this.author = response.User.alias;        

        
      },
      error => {
        this.online = false
      }
    );
    
    setTimeout(() => {
      this.showList=true;
      this.listTips.loadPosts();  
    }, 1000);
  }

}
