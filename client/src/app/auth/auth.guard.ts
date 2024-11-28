import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Ovdje možemo proveriti da li je korisnik ulogovan
    const isLoggedIn = localStorage.getItem('token') ? true : false;  // Pretpostavljamo da je token sačuvan u localStorage

    if (!isLoggedIn) {
      this.router.navigate(['/auth']);  // Preusmeravamo na login stranicu ako korisnik nije ulogovan
      return false;
    }
    return true;
  }
}
