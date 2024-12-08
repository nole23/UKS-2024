import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {

  isErrorSaved: boolean = false;
  isPassword1: boolean = false;
  isPassword2: boolean = false;
  isPasswordMatch: boolean = false;
  password1: string = '';
  password2: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  generateNewPassword(): void {
    if (!this.verifyPassword(this.password1, this.password2)) {
      let email = localStorage.getItem('resetPasswordEmail');
      if (email != null) {
        this.authService.generateNewPassword({'password': this.password1, 'email': email}).subscribe((res: any) => {
          if (!res.status) {
            alert('Server not responsed. Try again');
            this.router.navigate(['/auth/password_reset']);
          } else {
            alert('Successifull saved new password. Go to login page.')
            this.router.navigate(['/auth/login']);
          }
        })
      } else {
        alert('Email is not correctly. Try again');
        this.router.navigate(['/auth/password_reset']);
      }
    }
  }

  verifyPassword(password1: string, password2: string): boolean {
    const minLength = 8;
    // Provera dužine password1
    this.isPassword1 = password1.length < minLength;

    // Provera dužine password2
    this.isPassword2 = password2.length < minLength;

    // Provera da li password1 i password2 podudaraju
    this.isPasswordMatch = password1 !== password2;

    return this.isPassword1 || this.isPassword2 || this.isPasswordMatch;
  }
}
