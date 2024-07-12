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
  name: 'formatMiles'
})

export class formatMiles implements PipeTransform {
  public transform(value: any) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }
}



@Pipe({
  name: 'just400'
})

export class just400 implements PipeTransform {
  public transform(value: string) {
      return value.substring(0,200) 
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


@Pipe({
  name: 'haceCuanto'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value?: Date | string | number): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `hace ${interval} ${interval === 1 ? 'año' : 'años'}`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `hace ${interval} ${interval === 1 ? 'mes' : 'meses'}`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `hace ${interval} ${interval === 1 ? 'día' : 'días'}`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `hace ${interval} ${interval === 1 ? 'hora' : 'horas'}`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `hace ${interval} ${interval === 1 ? 'minuto' : 'minutos'}`;
    }
    return `hace ${Math.floor(seconds)} ${Math.floor(seconds) === 1 ? 'segundo' : 'segundos'}`;
  }

}