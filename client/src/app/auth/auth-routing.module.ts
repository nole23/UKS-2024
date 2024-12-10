import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Uveri se da je komponenta pravilno uvezena
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { RestartPasswordComponent } from './restart-password/restart-password.component';
import { CheckTockenComponent } from './restart-password/check-tocken/check-tocken.component';
import { NewPasswordComponent } from './restart-password/new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'singup', component: RegistrationComponent },
      { path: 'password_reset', component: RestartPasswordComponent },
      { path: 'verify_token', component: CheckTockenComponent },
      { path: 'new_password', component: NewPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
