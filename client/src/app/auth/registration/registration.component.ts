import { Component } from '@angular/core';
import { CreateUsers } from '../models/create-users';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;
  error!: {
    isEmail: boolean,
    isUseranem: boolean,
    isFirstname: boolean,
    isLastname: boolean,
    isPasswrod1: boolean,
    isPasswrod2: boolean,
    passwordsMatch: boolean,
    isNotSaved: boolean
  };
  constructor(private authService: AuthServiceService, private router: Router) {
    this.error = {
      isEmail: false,
      isUseranem: false,
      isFirstname: false,
      isLastname: false,
      isPasswrod1: false,
      isPasswrod2: false,
      passwordsMatch: false,
      isNotSaved: false
    }
  }

  createNewUsers(): void {
    if (this.verifyInput()) {

      let newUser = new CreateUsers({
        'email': this.email,
        'username': this.username,
        'firstName': this.firstName,
        'lastName': this.lastName,
        'password': this.password1
      });

      this.authService.registrationUsers(newUser).subscribe((res: any) => {
        if (!res.status) {
          this.error.isNotSaved = true;
        } else {
          alert(`User ${newUser.first_name + ' ' + newUser.last_name} is successed saved.`)
          this.router.navigate(['/auth/login']);
        }
      }, (error: any) => {
        this.error.isNotSaved = true;
      });
    }
  }

  verifyInput(): boolean {
    if (this.verifyEmail(this.email)) return false;
    if (this.verifyPassword(this.password1, this.password2)) return false;

    return true;
  }

  verifyEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      this.error.isEmail = true; // Ako nije ispravan, postavi error
      return true;
    } else {
      this.error.isEmail = false; // Ako je ispravan, resetuj error
      return false;
    }
  }

  verifyPassword(password1: string, password2: string): boolean {
    const minLength = 8;

    // Provera dužine password1
    this.error.isPasswrod1 = password1.length < minLength;

    // Provera dužine password2
    this.error.isPasswrod2 = password2.length < minLength;

    // Provera da li password1 i password2 podudaraju
    this.error.passwordsMatch = password1 !== password2;

    return this.error.isPasswrod1 || this.error.isPasswrod2 || this.error.passwordsMatch;
  }

}
