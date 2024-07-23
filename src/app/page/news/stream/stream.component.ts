import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalService } from '../../../services/portal.service';
import { UserRetro } from '../../../interfaces/responses';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  roomName: string = "RetroMasterEnVIVO";
  configDialog: MatSnackBarConfig = {
    duration: 10000,
    verticalPosition: 'top'
  };

  isLive: boolean = false;
  streamID: string = "";
  username: string = "";
  perfil: UserRetro = {};
  domain: string = "meet.jit.si"; // Cambia esto a tu dominio autohospedado
  room: any;
  options: any;
  api: any;
  user: any = {
    name: ""
  };



  constructor(private route: ActivatedRoute, private portalService: PortalService, private dialogEvents: MatSnackBar) { }

  transmitir(): void {
    var url = "https://meet.jit.si/retroMasterTV_" + this.user.name + "/" + this.roomName
    window.open(url, 'popup', 'width=800,height=600');
    this.isLive = true
  }

  copyURL(): void {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("https://meet.jit.si/retroMasterTV_" + this.user.name + "/" + this.roomName);
      this.dialogEvents.open("Texto copiado!", "cerrar", this.configDialog);
    } else {
      this.dialogEvents.open("No se pudo copiar el texto", "cerrar", this.configDialog);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || "";
      this.username = this.username.split("@")[1];
      this.perfil.alias = this.username;
      this.portalService.checkAlias(this.perfil).subscribe(
        response => {
          this.perfil = response;
          this.user.name = response.alias;
          this.roomName = "RetroTransmicion_" + response.alias + "_Presenta";
        }
      );
    });
  }


}
