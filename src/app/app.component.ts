import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})



@Injectable()
export class AppComponent implements OnInit {

  currentUrl : string =""

  isDesktop: boolean = true;

  constructor(private _elementRef: ElementRef, public platform: Platform, private router: Router,private route: ActivatedRoute) {

    if (this.platform.ANDROID || this.platform.IOS) {
      this.isDesktop = false      
      this.currentUrl = window.location.href;
      var params : string = ""

      if (this.currentUrl.split("?").length>1){
        params = this.currentUrl.split("?")[1]
      }
      console.log(this.currentUrl);

      localStorage.setItem("params",params)

      this.router.navigate(['/mobile']);
    }    
  }

  ngOnInit(): void {
    this._elementRef.nativeElement.removeAttribute("ng-version");
  }
  title = 'PortalRetroGames';


}
