import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url != this.auth.loginUrl && this.auth.isUserLogged()) {
      const authRequest = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.auth.getToken()
        })
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
