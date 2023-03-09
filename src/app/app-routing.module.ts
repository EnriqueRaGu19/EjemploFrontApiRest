import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './core/shop/shop.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path:'', component: ShopComponent },
  { path:'shop', component: ShopComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
