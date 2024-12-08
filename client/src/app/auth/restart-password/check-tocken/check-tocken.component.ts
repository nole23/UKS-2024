import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-tocken',
  templateUrl: './check-tocken.component.html',
  styleUrl: './check-tocken.component.css'
})
export class CheckTockenComponent {

  token: string = '';
  isError: boolean = false;
  isErrorToken: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  verifyToken() {
    if (this.token.length > 0) {
      this.authService.verifyToken(this.token).subscribe((res: any) => {
        if (!res.status) {
          this.isErrorToken = true;
        } else {
          this.router.navigate(['/auth/new_password']);
        }
      });
    }
  }
}
