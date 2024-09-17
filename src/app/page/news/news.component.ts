import {  Component, OnInit, ViewChild } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { ListComponent } from './list/list.component';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

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

  
  isSelected(value: string): boolean {
    return this.typeOfTips.includes(value);
  }

  
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
  
  constructor(private sesionService: SesionService,    private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute) {
      
  }


  ngOnInit(): void {
    this.updateMetaTags();

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


  updateMetaTags() {
    // Cambia el título dinámicamente
    this.title.setTitle('Novedades en Retro Master');

    // Añade o actualiza las etiquetas Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Novedades en Retro Master' });
    this.meta.updateTag({ property: 'og:description', content: 'Contenido Maestro' });
    this.meta.updateTag({ property: 'og:image', content: 'https://retromasters.up.railway.app/assets/img/Titulo.png' });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });

    // Añade etiquetas para Twitter Cards
    this.meta.updateTag({ name: 'twitter:title', content: 'Novedades en Retro Master' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Contenido Maestro' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://retromasters.up.railway.app/assets/img/Titulo.png' });
  }

}
