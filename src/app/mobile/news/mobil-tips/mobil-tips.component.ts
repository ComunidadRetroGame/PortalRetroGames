

import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { Tips } from '../../../interfaces/portal';
import { PortalService } from '../../../services/portal.service';


@Component({
  selector: 'app-mobil-tips',
  templateUrl: './mobil-tips.component.html',
  styleUrl: './mobil-tips.component.scss'
})
export class MobilTipsComponent {

  idTips: string = "";

  constructor(private route: ActivatedRoute,private portalService: PortalService,   private dialogEvents: MatSnackBar) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idTips = params.get('id') + ""
      this.portalService.getTip( this.idTips).subscribe(
        response => {
          this.tips = response;            
        }
      );
    });
  }

  @Input() tips: Tips = { url: "", content: "", id: "" };

  @Input() isDelete: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  shared() {
    this.dialogEvents.open("Url Copiada lista para compartir!", "cerrar", this.configDialog);
    navigator.clipboard.writeText("https://" + document.location.hostname + "/s?id=" + this.tips.id);
  }

  msgText(): string {
    var url: string = "https://" + document.location.hostname + "/s?id=" + this.tips.id
    return this.tips.title + ", " + url;
  }



}
