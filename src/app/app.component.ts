import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})



@Injectable()
export class AppComponent implements OnInit {



  isDesktop: boolean = true;



  constructor(private _elementRef: ElementRef, public platform: Platform, private router: Router) {

    if (this.platform.ANDROID || this.platform.IOS) {
      this.isDesktop = false
      this.router.navigate(['/mobile']);
    }
  }


  ngOnInit(): void {
    this._elementRef.nativeElement.removeAttribute("ng-version");
  }
  title = 'PortalRetroGames';


}
