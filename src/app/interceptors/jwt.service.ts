import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../tokenService/token.service';
import { Router } from '@angular/router';
import { request } from 'http';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor{

  constructor(private tokenService : TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     console.log(req);
    
    // Récupérer le token JWT depuis le service
     const token = this.tokenService.getToken();
     if(token !== null) {
      let clone =  req.clone({
        headers : req.headers.set('Authorization', 'bearer '+token)
      })
      console.log(clone)
      return next.handle(clone).pipe(
        catchError(error => {
           console.log(error)
        if(error.status == 401){
          this.tokenService.clearTokenExpired()
        }
        return throwError('Session Expired')
      })
    )
   }
    return next.handle(req);
  }
}
