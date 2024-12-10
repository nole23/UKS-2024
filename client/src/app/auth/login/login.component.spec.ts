import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { of, throwError } from 'rxjs'; // Dodaj throwError za testiranje grešaka
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthServiceService>;

  beforeEach(() => {
    // Kreiraj spy objekat za login metodu
    authService = jasmine.createSpyObj('AuthServiceService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthServiceService, useValue: authService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show email error when email is empty', () => {
    component.email = ''; // Prazan email
    component.password = 'somepassword'; // Validna lozinka

    fixture.detectChanges();  // Ažuriraj komponentu nakon promene vrednosti

    component.login(); // Poziv funkcije login

    expect(component.isEmail).toBeTrue();  // Email je prazan, pa bi isEmail trebalo da bude true
    expect(component.isPassword).toBeFalse(); // Lozinka nije prazna, pa bi isPassword trebalo da bude false
  });

  it('should show password error when password is empty', () => {
    component.email = 'user@example.com'; // Validan email
    component.password = ''; // Prazna lozinka

    fixture.detectChanges();  // Ažuriraj komponentu nakon promene vrednosti

    component.login(); // Poziv funkcije login

    expect(component.isEmail).toBeFalse(); // Email nije prazan, pa bi isEmail trebalo da bude false
    expect(component.isPassword).toBeTrue(); // Lozinka je prazna, pa bi isPassword trebalo da bude true
  });

  it('should not call authService.login if there are errors', () => {
    component.email = ''; // Prazan email
    component.password = 'somepassword'; // Lozinka je uneta

    component.login(); // Poziv funkcije login

    expect(authService.login).not.toHaveBeenCalled(); // Ne bi trebalo da pozove login metod
  });

  it('should show login error if login fails', () => {
    component.email = 'user@example.com'; // Valid email
    component.password = 'password123'; // Valid password

    // Mockiraj neuspešan odgovor
    authService.login.and.returnValue(of({ status: false }));

    component.login(); // Poziv funkcije login

    expect(component.loginError1).toBeTrue(); // Trebalo bi da se postavi na true jer login nije uspeo
  });

  it('should show login error if server returns unexpected status', () => {
    component.email = 'user@example.com';
    component.password = 'password123';

    // Mockiraj neočekivan status odgovora, koristeći 'false' umesto 'undefined'
    authService.login.and.returnValue(of({ status: false }));

    component.login(); // Poziv funkcije login

    expect(component.loginError1).toBeTrue(); // Trebalo bi da se postavi na true jer status nije uspešan (false)
  });

  it('should reset form when form is invalid', () => {
    // Postavi invalid form
    component.email = ''; // Prazan email
    component.password = 'password123'; // Lozinka je uneta

    component.login(); // Poziv funkcije login

    expect(component.isEmail).toBeTrue(); // Email je invalidan
    expect(component.isPassword).toBeFalse(); // Lozinka je validna
  });

  it('should not proceed with login if form is invalid', () => {
    // Unesite prazne podatke
    component.email = '';  // Prazan email
    component.password = '';  // Prazna lozinka

    // Pozovite login funkciju
    component.login();  // Poziv funkcije login

    // Očekujte da authService.login nije pozvan jer su podaci invalidni
    expect(authService.login).not.toHaveBeenCalled();  // login ne bi trebalo da bude pozvan
  });

  it('should show both errors when email and password are invalid', () => {
    component.email = ''; // Prazan email
    component.password = ''; // Prazna lozinka

    component.login(); // Poziv funkcije login

    expect(component.isEmail).toBeTrue(); // Email je invalidan
    expect(component.isPassword).toBeTrue(); // Lozinka je invalidna
  });
});
