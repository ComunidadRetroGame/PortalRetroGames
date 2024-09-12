import { Component, HostListener, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Tips } from '../../interfaces/portal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userName: string = ""
  about: string = ""
  lastSearch: string ="****"


  typeOfTips: string[] = ['youtube', 'url', 'tips'];

  posts: Tips[] = [];
  page: number = 0;
  limit: number = 10;
  search: string = '';
  loading: boolean = false;
  allLoaded: boolean = false;

  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'top'
  }

  constructor(private sesionService: SesionService, private router: Router, private dialogEvents: MatSnackBar, private postService: PostService) { }

  // Función que verifica si un valor está seleccionado
  isSelected(value: string): boolean {
    return this.typeOfTips.includes(value);
  }

  // Función que agrega o quita el valor del arreglo dependiendo del estado del checkbox
  toggleSelection(value: string, event: any): void {
    if (event.target.checked) {
      if (!this.typeOfTips.includes(value)) {
        this.typeOfTips.push(value);
      }
    } else {
      this.typeOfTips = this.typeOfTips.filter(v => v !== value);
    }
    this.lastSearch="****"
  }



  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      userOnline => {
        this.userName = userOnline.User.alias;

        if (userOnline.Code == 200) {

          this.sesionService.userData().subscribe(
            userRetro => {
              this.userName = userRetro.name || ""
              this.about = userRetro.about_me || ""
              if (this.userName == "") {
                this.dialogEvents.open("Debe completar su perfil!", "cerrar", this.configDialog);
                this.router.navigate(['/dashboard']);
              }
            }
          );
        }
      },
      error => {
        this.userName = ""
      }
    );
  }

  onSearch(): void {
    if (this.search != "" || this.search != this.lastSearch) {
      this.lastSearch = this.search
      this.page = 0;
      this.posts = [];
      this.allLoaded = false;
      this.loadPosts();
    }else{
      this.dialogEvents.open('No tengas verguenza agrega algo al buscador!', "cerrar", this.configDialog);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 1 && !this.loading && !this.allLoaded) {
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.loading = true;

    this.postService.getPostsFind(this.page, this.limit, this.search, this.typeOfTips).subscribe(
      (newPosts) => {
        if (newPosts != null) {

          if (newPosts.length == 0) {
            this.dialogEvents.open('No tenemos informacion sobre ' + this.search + ' lo sentimos :(', "cerrar", this.configDialog);
          } else {

            if (newPosts.length < this.limit) {
              this.allLoaded = true;
            }
            this.posts = [...this.posts, ...newPosts];
            this.page++;
          }
        } else {
          this.dialogEvents.open('No tenemos informacion sobre ' + this.search + ' lo sentimos :(', "cerrar", this.configDialog);
        }
        this.loading = false;
      },
      (error) => {
        this.dialogEvents.open('Error en la busqueda, lo sentimos mucho', "cerrar", this.configDialog);
        this.loading = false;
      }
    );
  }

}


