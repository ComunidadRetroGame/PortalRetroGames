import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalService } from '../../../services/portal.service';
import { UserRetro } from '../../../interfaces/responses';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent implements OnInit {

  isLive : boolean = false;
  streamID : string = "";

  username: string = "";

  perfil: UserRetro = {}

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any = {
    name: ""
  };

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private route: ActivatedRoute, private portalService: PortalService) { }
  transmitir(): void {


    const livestreamOptions = {
      streamId: this.streamID
    };


    this.options = {
      roomName: "PORTAL_RETRO_GAMER_" + this.perfil.alias+ "_PRESENTA",
      width: "100%",
      height: 600,
      configOverwrite: { prejoinPageEnabled: false },
      
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'livestreaming',
          'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip',
          'invite', 'feedback', 'stats', 'shortcuts', 'tileview', 'videobackgroundblur', 'download',
          'help', 'mute-everyone', 'e2ee', 'security'
        ]
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.perfil.alias
      }
    }




    

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
    });

    this.isLive=true;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || "";
      this.username = this.username.split("@")[1]
      this.perfil.alias = this.username
      this.portalService.checkAlias(this.perfil).subscribe(
        response => {
          this.perfil = response
          this.user.name = response.alias
          this.room = "RetroTransmicion_" + response.alias + "_Presenta"
        }
      );

    });

  };

  handleClose = () => {
    console.log("handleClose");
  }

  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");

  }

  handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if (command == 'hangup') {

      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

}
