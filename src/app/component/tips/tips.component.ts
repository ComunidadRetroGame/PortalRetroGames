
import { Tips } from '../../interfaces/portal';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";



@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})

export class TipsComponent implements OnInit {

  showMoreTips: boolean = false

  showMore() {
    this.showMoreTips = !this.showMoreTips;
  }

  @Input() tips: Tips = { url: "", content: "", id:"" };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


}
