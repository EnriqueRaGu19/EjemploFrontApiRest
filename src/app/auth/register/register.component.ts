import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ){}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formRegister = this.formBuilder.group({
      nombre:["",
        [Validators.required]
      ],
      apellido: ["",
        [ Validators.required]
      ],
      correo: ["",
        [ Validators.required, Validators.email]
      ],
      clave: ["",
        [ Validators.required]
      ],
    });
  }

  register() {
    this.registerService.register(this.formRegister.value).then( data => {
      console.log("Regisrado correctamente");
      this.router.navigate(['login']);
    });
  }

}
