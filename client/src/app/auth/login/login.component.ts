import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { LoginUsers } from '../models/login-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  loginError1: boolean = false;
  isEmail: boolean = false;
  isPassword: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) {}

  login(): void {
    if (this.email.length === 0) {
      this.isEmail = true;
    } else {
      this.isEmail = false;
    }

    if (this.password.length === 0) {
      this.isPassword = true;
    } else {
      this.isPassword = false;
    }

    if (!this.isEmail && !this.isPassword) {
      this.authService.login(new LoginUsers({'email': this.email, 'password': this.password}))
        .subscribe((res: any) => {
          if (!res.status) {
            this.loginError1 = true;
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        (error: any) => {
          window.alert(error);
        });
    }
  }
}
