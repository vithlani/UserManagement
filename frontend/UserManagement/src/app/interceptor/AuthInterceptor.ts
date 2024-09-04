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

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ADD TOKEN TO REQUEST HEADER
    console.log('Token', localStorage.getItem('authToken'));
    const clonedRequest = localStorage.getItem('authToken')
      ? req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + localStorage.getItem('authToken')
          ),
        })
      : req;
    return next.handle(clonedRequest).pipe(
      delay(500),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
        }
        return evt;
      })
    );
  }
}
