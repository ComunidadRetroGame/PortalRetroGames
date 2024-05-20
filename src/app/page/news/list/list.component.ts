
// src/app/components/post-list/post-list.component.ts
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Tips } from '../../../interfaces/portal';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  posts: Tips[] = [];
  page: number = 0;
  limit: number = 10;
  loading: boolean = false;
  allLoaded: boolean = false;

  @Input() aliasOnline: string = "";

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
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
    this.postService.getPosts(this.page, this.limit).subscribe(
      (newPosts) => {
        if (newPosts.length < this.limit) {
          this.allLoaded = true;
        }
        this.posts = [...this.posts, ...newPosts];
        this.page++;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading posts', error);
        this.loading = false;
      }
    );
  }
}
