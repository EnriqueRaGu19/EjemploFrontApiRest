import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  path = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  register(body:any) {
    const req$ = this.http.post(this.path + "auth/register", body);
    return lastValueFrom(req$);
  }
}
