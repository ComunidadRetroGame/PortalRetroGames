import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tips } from '../../interfaces/portal';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent  implements OnInit { 

  id: string = ""

  tips: Tips = { content: "", url: "" , id:"" }

  constructor(private activatedRoute: ActivatedRoute, private portalService : PortalService)  {

    

    this.activatedRoute.queryParams.subscribe(params => {
      

      this.id = params['id'];

      console.log(this.id)

      if (this.id== "new") {
        var jsonTips: string = window.localStorage.getItem("newTips") || ""

        if (jsonTips != "") {
          this.tips = JSON.parse(jsonTips);
        }
      }else{
        this.portalService.getTip(this.id).subscribe(
          response => {
            this.tips = response;
      
          }
        );
      }

    });
  }


  ngOnInit(): void {


    
  }
}
