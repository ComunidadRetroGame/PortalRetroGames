import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url:string) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

}


@Pipe({
  name: 'justHost'
})
export class JustHostPipe implements PipeTransform {
  public transform(value: string): string {
      try {
          const url = new URL(value);
          return url.hostname;
      } catch (e) {
          console.error('Invalid URL:', value);
          return '';
      }
  }
}