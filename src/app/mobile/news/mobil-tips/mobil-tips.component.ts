

import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Tips } from '../../../interfaces/portal';
import { PostService } from '../../../services/post.service';
import { SesionService } from '../../../services/sesion.service';


@Component({
  selector: 'app-mobil-tips',
  templateUrl: './mobil-tips.component.html',
  styleUrl: './mobil-tips.component.scss'
})
export class MobilTipsComponent {


  
  constructor(private router: Router, private sanitizer: DomSanitizer, private sesionService: SesionService, private postService: PostService, private dialogEvents: MatSnackBar) {

  }



  @Input() tips: Tips = { url: "", content: "", id: "" };

  @Input() isDelete: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  ngOnInit(): void {
  }



  shared() {
    this.dialogEvents.open("Url Copiada lista para compartir!", "cerrar", this.configDialog);
    navigator.clipboard.writeText("https://" + document.location.hostname + "/s?id=" + this.tips.id);
  }


  msgText() : string{
    var url : string = "https://" + document.location.hostname + "/s?id=" + this.tips.id
    return this.tips.title + ", " + url; 
  }



}
