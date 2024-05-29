import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tips } from '../../interfaces/portal';
import { PortalService } from '../../services/portal.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent implements OnInit {

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }


  id: string = ""

  tips: Tips = { content: "", url: "", id: "" }

  constructor(private activatedRoute: ActivatedRoute, private portalService: PortalService, private titleService: Title, private metaService: Meta,private dialogEvents: MatSnackBar) {

    this.activatedRoute.queryParams.subscribe(params => { 

      this.id = params['id'];

      console.log(this.id)

      if (this.id == "new") {
        var jsonTips: string = window.localStorage.getItem("newTips") || ""

        if (jsonTips != "") {
          this.tips = JSON.parse(jsonTips);
        }
      } else {
        this.portalService.getTip(this.id).subscribe(
          response => {
            this.tips = response;

          }
        );
      }
      this.titleService.setTitle(this.tips.title || "");
      this.metaService.addTags([
        { name: 'description', content: this.tips.title || "" },
      ]);
    });
  }

  shared() {
    this.dialogEvents.open("Url Copiada lista para compartir!", "cerrar", this.configDialog);
    navigator.clipboard.writeText("https://" + document.location.hostname + "/s?id=" + this.tips.id);
  }


  msgText() : string{
    var url : string = "https://" + document.location.hostname + "/s?id=" + this.tips.id
    return this.tips.title + ", " + url; 
  }
  ngOnInit(): void {



  }
}
