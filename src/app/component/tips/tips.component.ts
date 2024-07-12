
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Tips } from '../../interfaces/portal';
import { PostService } from '../../services/post.service';



@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})

export class TipsComponent implements OnInit {

  event: boolean = false;

  falta: string = "";

  finish: boolean = false;

  constructor(private router: Router, private sanitizer: DomSanitizer, private postService: PostService, private dialogEvents: MatSnackBar) {

  }

  @Input() tips: Tips = { url: "", content: "", id: "" };

  @Input() isDelete: boolean = false;

  @Input() preEdit: boolean = false;

  @Input() isOnline: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  ngOnInit(): void {
    const hoy = new Date();

    const tipsDate = this.tips.date ? new Date(this.tips.date) : hoy;
    this.event = tipsDate > hoy;

    if (this.event) {
      this.falta = this.cuantoFalta(hoy, tipsDate);
    }

  }

  cuantoFalta(startDate: Date, endDate: Date): string {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      return 'Hoy';
    } else if (diffInDays === 1) {
      return 'Dentro de un día';
    } else if (diffInDays < 7) {
      return `Dentro de ${diffInDays} días`;
    } else if (diffInDays < 30) {
      const weeks = Math.ceil(diffInDays / 7);
      return `Dentro de ${weeks} semana${weeks > 1 ? 's' : ''}`;
    } else {
      const months = Math.ceil(diffInDays / 30);
      return `Dentro de ${months} mes${months > 1 ? 'es' : ''}`;
    }
  }

  killme(): boolean {
    if (this.finish && this.isDelete) {
      this.gameOver(this.tips.id)
      return true;
    } else {
      return false;
    }
  }

  edit() {
    if (this.isDelete) {
      this.gameOver(this.tips.id)
    }else{
      this.dialogEvents.open("quieren hackear el sitioooo!!", "cerrar", this.configDialog);
    }
  }

  gameOver(id: string): void {
    if (this.isDelete) {
      this.postService.deletePost(id).subscribe(
        () => {
          this.dialogEvents.open("Noticia eliminada!", "cerrar", this.configDialog);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.dialogEvents.open("No fue posible eliminar", "cerrar", this.configDialog);
        }
      );
    }else{
      this.dialogEvents.open("quieren hackear el sitioooo!!", "cerrar", this.configDialog);
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



}
