import { Component, ViewChild } from '@angular/core';
import { MobilListComponent } from '../news/mobil-list/mobil-list.component';


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
    this.mobilListComponent.findPosts();
  }

}
