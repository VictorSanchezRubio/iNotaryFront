import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from "rxjs/operators";


@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 400) {
          // auto logout if 401 or 400 response returned from api               
         this.router.navigate([''])
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
