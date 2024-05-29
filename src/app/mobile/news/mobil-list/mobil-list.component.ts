// src/app/components/post-list/post-list.component.ts
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Tips } from '../../../interfaces/portal';
import { SesionService } from '../../../services/sesion.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-mobil-list',
  templateUrl: './mobil-list.component.html',
  styleUrl: './mobil-list.component.scss'
})
export class MobilListComponent implements OnInit {
  posts: Tips[] = [];
  page: number = 0;
  limit: number = 5;
  loading: boolean = false;
  allLoaded: boolean = false;


  aliasOnline: string = "";
  @Input() search: string | undefined;

  constructor(private postService: PostService, private dialogEvents: MatSnackBar) { }

  
  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'bottom'
  }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 1 && !this.loading && !this.allLoaded) {
      this.findPosts();
    }
  }

  findPosts(): void {
    this.loading = true;
    this.page=0;
    this.posts=[]
    this.postService.getPostsFind(this.page, this.limit, this.search).subscribe(
      (newPosts) => {
        if (newPosts != null) {

          if (newPosts.length < this.limit) {
            this.allLoaded = true;
          }
          this.posts = [...this.posts, ...newPosts];
          this.page++;
          this.loading = false;
        }else{
          this.loading = false;
          this.dialogEvents.open("No encontre nada", "cerrar", this.configDialog);
        }
      },
      (error) => {
        console.error('Error loading posts', error);
        this.loading = false;
      }
    );
  }

}
