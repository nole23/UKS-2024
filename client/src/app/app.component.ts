import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Management App';
  isLogginUser: boolean = false;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    this.isLogginUser = this.commonService.checkUserLoggedIn();
  }

  // Ova funkcija može biti korišćena da preusmeri korisnika na login ekran ako nije ulogovan
  logout() {
    // Ukloni token kada korisnik izađe
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);  // Preusmeravanje na login ekran
  }
}
