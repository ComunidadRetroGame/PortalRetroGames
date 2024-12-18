import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Injectable()
export class LoaderSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Activa el loader al iniciar la petición
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => {
        // Desactiva el loader cuando la petición termina
        this.loaderService.hide();
      })
    );
  }
}

