
// src/app/components/post-list/post-list.component.ts
import { Component, HostListener, Input } from '@angular/core';
import { Tips } from '../../../interfaces/portal';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  posts: Tips[] = [];
  page: number = 0;
  loading: boolean = false;
  allLoaded: boolean = false;

  @Input() limit: number = 6;

  @Input() perfil: string = "";

  @Input() isDelete: boolean = false;
  
  @Input() isOnline: boolean = false;

  @Input() typeOfTips: string[] = [];

  constructor(private postService: PostService) {

    
  }

  clearList(){
    this.posts=[];
    this.page = 0;
    this.loading = false;
    this.allLoaded = false;
  
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

    if (this.perfil == "") {
    
      this.postService.getPosts(this.page, this.limit,this.typeOfTips).subscribe(
        (newPosts) => {

          if (newPosts != null) {

            if (newPosts.length < this.limit) {
              this.allLoaded = true;
            }
            this.posts = [...this.posts, ...newPosts];
            this.page++;
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error loading posts', error);
          this.loading = false;
        }
      );
    } else {
      this.postService.getPostsByAlias(this.perfil, this.page, this.limit,this.typeOfTips).subscribe(
        (newPosts) => {

          if (newPosts != null) {
            if (newPosts.length < this.limit) {
              this.allLoaded = true;
            }
            this.posts = [...this.posts, ...newPosts];
            this.page++;
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error loading posts', error);
          this.loading = false;
        }
      );
    }
  }
}
