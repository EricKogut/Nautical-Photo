import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
3;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /////////////////////////////////
  //Used to interceot all request and attach the id token
  /////
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Getting the id token
    const idToken = localStorage.getItem('id_token');

    //If the token exists, we set the header with the idToekn
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', idToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
