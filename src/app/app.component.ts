import { Component, Injectable, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    
})

@Injectable()
export class AppComponent implements OnInit{
  ngOnInit(): void {
    
  }
  title = 'PortalRetroGames';
}
