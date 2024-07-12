// src/app/components/post-list/post-list.component.ts
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Tips } from '../../../interfaces/portal';
import { PostService } from '../../../services/post.service';
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

  @Input() search: string | undefined;

  constructor(private postService: PostService, private dialogEvents: MatSnackBar) { }

  
  configDialog: MatSnackBarConfig = {
    duration: 10000, verticalPosition: 'bottom'
  }

  ngOnInit(): void {
    this.page=0;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 1 && !this.loading && !this.allLoaded) {
      this.findPosts();
    }
  }

  reset():void{
    this.posts=[]
  }

  findPosts(): void {
    this.loading = true;
       
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
