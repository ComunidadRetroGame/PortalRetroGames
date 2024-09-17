import { Component, ViewChild } from '@angular/core';
import { MobilListComponent } from '../news/mobil-list/mobil-list.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class MobileHomeComponent {
  @ViewChild(MobilListComponent) mobilListComponent!: MobilListComponent;
  query: string = "";
  showLogo: boolean = true;

  find() {
    this.showLogo = false;
    this.mobilListComponent.reset();
    this.mobilListComponent.findPosts();
  }

  constructor(private router: Router) {
    var params: string = localStorage.getItem("params") + ""

    console.log("DESDE EL MOBIL :" + params)

    if (params.startsWith("id=")){
      var idTips : string = params.split("=")[1]
      this.router.navigate(['/mobileTips/'+idTips]);
    }

  }


}
