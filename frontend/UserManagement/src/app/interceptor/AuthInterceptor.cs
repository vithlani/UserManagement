import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
// SERVICES
import { LoadingSpinnerService } from '@core/services/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private spinnerService: LoadingSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ADD TOKEN TO REQUEST HEADER
    const clonedRequest = this.localStorage.getItem('authToken')
      ? req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + this.localStorage.getItem('authToken')
          ),
        })
      : req;
    return next.handle(clonedRequest).pipe(delay(500),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
        }
        return evt;
      })
    );
  }
}
