
import { Tips } from '../../interfaces/portal';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { SesionService } from '../../services/sesion.service';
import { PortalService } from '../../services/portal.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})

export class TipsComponent implements OnInit {


  showMoreTips: boolean = false

  constructor(private router: Router, private sanitizer: DomSanitizer, private sesionService: SesionService, private postService: PostService, private dialogEvents: MatSnackBar) {

  }

  showMore() {
    this.showMoreTips = !this.showMoreTips;
  }

  @Input() tips: Tips = { url: "", content: "", id: "" };

  @Input() isDelete: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  ngOnInit(): void {
  }

  killme() {
    this.gameOver(this.tips.id)
  }

  gameOver(id: string): void {
    this.postService.deletePost(id).subscribe(
      () => {
        this.dialogEvents.open("Noticia eliminada!", "cerrar", this.configDialog);
        this.router.navigate(['/news']);
      },
      (error) => {
        this.dialogEvents.open("No fue posible eliminar", "cerrar", this.configDialog);
      }
    );
  }



}
