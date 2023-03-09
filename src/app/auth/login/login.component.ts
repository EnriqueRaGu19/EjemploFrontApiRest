import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ){}

  ngOnInit() {
    this.buildForm();
    this.validateIsAuth();
  }

  validateIsAuth() {
    const token = this.loginService.getToken();
    token? this.router.navigate(['shop']) : null;
  }

  register() {
    this.router.navigate(['register']);
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      correo: ["",
        [ Validators.required]
      ],
      clave: ["",
        [ Validators.required]
      ],
    });
  }

  login() {
    this.loginService.login(this.formLogin.value).then( async (data:any) => {
      await this.loginService.setToken(data.token);
      this.router.navigate(['shop'])
    }).catch(error => {
      console.log(error);
    });
  }

}
