import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    let headers;
    token?  headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token}) : 
            headers = new HttpHeaders({'Content-Type':'application/json'});
    const reqClone = req.clone({ headers });
    return next.handle(reqClone);
  }
}
