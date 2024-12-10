import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private commonService: CommonService, private router: Router) {}

  canActivate() {
    if (this.commonService.checkUserLoggedIn()) {
      return true;  // Dozvoljava pristup ako je korisnik ulogovan
    } else {
      this.router.navigate(['/auth']);  // Preusmerava na login ako nije ulogovan
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}

  canActivate() {
    if (!this.commonService.checkUserLoggedIn()) {
      return true;  // Dozvoljava pristup ako nije ulogovan
    } else {
      this.router.navigate(['/dashboard']);  // Preusmerava na dashboard ako je ulogovan
      return false;
    }
  }
}