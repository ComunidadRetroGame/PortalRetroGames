
import { Tips } from '../../interfaces/portal';
import { Component, OnInit, Input} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";



@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})

export class TipsComponent implements OnInit {

  @Input() tips: Tips = { url: "" };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


}
