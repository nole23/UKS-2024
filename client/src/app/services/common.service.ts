import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

    // Provera da li je korisnik ulogovan
    checkUserLoggedIn() {
      let aldUser = localStorage.getItem('user');
      if (aldUser !== null) {
        return true;
      }
      return false;
    }

    logout() {
      localStorage.removeItem('user');
      window.location.reload();
    }
}
