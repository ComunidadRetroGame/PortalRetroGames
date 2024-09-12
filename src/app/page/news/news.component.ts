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

  typeOfTips: string[] = ['youtube', 'url', 'tips'];

  // Función que verifica si un valor está seleccionado
  isSelected(value: string): boolean {
    return this.typeOfTips.includes(value);
  }

  // Función que agrega o quita el valor del arreglo dependiendo del estado del checkbox
  toggleSelection(value: string, event: any): void {
    if (event.target.checked) {
      if (!this.typeOfTips.includes(value)) {
        this.typeOfTips.push(value);
      }
    } else {
      this.typeOfTips = this.typeOfTips.filter(v => v !== value);
    }
    this.listTips.clearList();
    this.listTips.typeOfTips =  this.typeOfTips;
    this.listTips.loadPosts();  
    
  }
  
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
