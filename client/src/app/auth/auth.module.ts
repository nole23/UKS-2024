import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Dodaj ovo

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';  // Proveri da li je komponenta pravilno uvezena
import { AuthComponent } from './auth.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthServiceService } from './service/auth-service.service';
import { RestartPasswordComponent } from './restart-password/restart-password.component';
import { CheckTockenComponent } from './restart-password/check-tocken/check-tocken.component';
import { NewPasswordComponent } from './restart-password/new-password/new-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    RestartPasswordComponent,
    CheckTockenComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [AuthServiceService],
  bootstrap: [AuthComponent]
})
export class AuthModule { }
