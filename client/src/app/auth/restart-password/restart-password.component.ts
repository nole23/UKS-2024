import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrl: './restart-password.component.css'
})
export class RestartPasswordComponent {

  email: string = '';
  isError: boolean = false;
  isErrorSend: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) {}

  restartPassword() {
    if (this.verifyEmail(this.email)) {
      this.authService.sendRestartRequest(this.email).subscribe((res: any) => {
        if (!res.status) {
          this.isErrorSend = true;
        } else {
          localStorage.setItem('resetPasswordEmail', JSON.stringify({'email': this.email}))
          this.router.navigate(['/auth/verify_token']);
        }
      }, _ => {
        this.isErrorSend = true;
      });
    }
    else {

    }
  }

  verifyEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && emailRegex.test(email)) {
      this.isError = false;
      return true;
    } else {
      this.isError = true;
      return false;
    }
  }
}
