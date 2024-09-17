import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetroComment, Tips } from '../../interfaces/portal';
import { PortalService } from '../../services/portal.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserRetro } from '../../interfaces/responses';
import { SesionService } from '../../services/sesion.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent implements OnInit {

  author: UserRetro = {}

  isOnline: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }


  id: string = ""

  tips: Tips = { content: "", url: "", id: "" }

  comment: RetroComment = {};

  constructor(private sesionService: SesionService, private postService: PostService, private activatedRoute: ActivatedRoute, private portalService: PortalService, private titleService: Title, private metaService: Meta, private dialogEvents: MatSnackBar, private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute) {

      this.context();

  }


  context() {
    this.sesionService.userData().subscribe(
      response => {
        this.author = response;
        this.isOnline = response.alias != "";
      });

    this.activatedRoute.queryParams.subscribe(params => {

      this.id = params['id'];

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

    this.title.setTitle("RetroMaster:"+ this.tips.title );

    this.meta.updateTag({ property: 'og:title', content: this.tips.title + " RetroMaster" });
    this.meta.updateTag({ property: 'og:description', content: this.tips.content });
    this.meta.updateTag({ property: 'og:image', content: this.author.avatar_yt + "" });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });

    this.meta.updateTag({ name: 'twitter:title', content: this.tips.title + " RetroMaster" });
    this.meta.updateTag({ name: 'twitter:description', content: this.tips.content });
    this.meta.updateTag({ name: 'twitter:image', content: this.author.avatar_yt + "" });
  }

  send(): void {
    this.comment.tipsId = this.id;
    this.comment.author = this.author.alias
    if (this.comment.comment != "") {
      this.postService.comment(this.comment).subscribe(
        comments => {
          console.log(JSON.stringify(comments))
          this.tips.comments = comments
          this.comment.comment = ""
        },
        (error) => {

        }
      );
    }
  }


  shared() {
    this.dialogEvents.open("Url Copiada lista para compartir!", "cerrar", this.configDialog);
    navigator.clipboard.writeText("https://" + document.location.hostname + "/s?id=" + this.tips.id);
  }


  msgText(): string {
    var url: string = "https://" + document.location.hostname + "/s?id=" + this.tips.id
    return this.tips.title + ", " + url;
  }
  ngOnInit(): void {

    

  }
}
