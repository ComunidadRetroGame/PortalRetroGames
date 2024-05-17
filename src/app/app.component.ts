import { Component, ElementRef, Injectable, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    
})

@Injectable()
export class AppComponent implements OnInit{
  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this._elementRef.nativeElement.removeAttribute("ng-version");
  }
  title = 'PortalRetroGames';
}
