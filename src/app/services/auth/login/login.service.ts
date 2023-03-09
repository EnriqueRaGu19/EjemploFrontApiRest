import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  path = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  login(body:any) {
    const req$ = this.http.post(this.path + "auth/login", body);
    return lastValueFrom(req$);
  }

  setToken(token:string) {
    localStorage.setItem('token', token.toString());
  }

  getToken() {
    return localStorage.getItem("token");
  }

}
