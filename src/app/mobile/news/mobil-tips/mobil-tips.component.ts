

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
  showHome: boolean = false;
  @Input() showShared: boolean = false;

  constructor(private route: ActivatedRoute, private portalService: PortalService, private dialogEvents: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idTips = params.get('id') || ""
      if (this.idTips != "") {
        this.portalService.getTip(this.idTips).subscribe(
          response => {
            this.tips = response;
            localStorage.setItem("params", "")
            this.showHome = true
            this.showShared = true
          }
        );
      }
    });
  }

  @Input() tips: Tips = { url: "", content: "", id: "", type: "" };

  @Input() isDelete: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  shared() {
    this.dialogEvents.open("Url Copiada lista para compartir!", "cerrar", this.configDialog);
    if (this.showShared && this.tips != null) {
      navigator.clipboard.writeText("https://" + document.location.hostname + "/s?id=" + (this.tips.id + ""));
    }
  }

  home() {
    localStorage.setItem("params", "")
    this.router.navigate(['/mobile']);
  }

  msgText(): string {
    if (this.showShared && this.tips != null) {
      var url: string = "https://" + document.location.hostname + "/s?id=" + (this.tips.id + "")
      return this.tips.title + ", " + url;
    } else {
      return "https://" + document.location.hostname;
    }
  }



}
