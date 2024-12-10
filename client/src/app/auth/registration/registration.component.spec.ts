import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms'; // Za ngModel
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs'; // Za mockiranje odgovora
import { RouterTestingModule } from '@angular/router/testing'; // Za mockiranje Routera

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: jasmine.SpyObj<AuthServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Kreiraj mock-ove za AuthService i Router
    authService = jasmine.createSpyObj('AuthServiceService', ['registrationUsers']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule, RouterTestingModule], // Uvezi potrebne module
      providers: [
        { provide: AuthServiceService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format', () => {
    // Unesite nevalidan email
    component.email = 'invalid-email';
    component.verifyEmail(component.email);

    // Očekujte da error za email bude postavljen na true
    expect(component.error.isEmail).toBeTrue();

    // Unesite validan email
    component.email = 'valid@example.com';
    component.verifyEmail(component.email);

    // Očekujte da error za email bude postavljen na false
    expect(component.error.isEmail).toBeFalse();
  });

  it('should validate password match and length', () => {
    // Unesite nevalidnu lozinku
    component.password1 = 'short';
    component.password2 = 'short1';
    component.verifyPassword(component.password1, component.password2);

    // Očekujte da je postavljen error za password1, password2 i passwordsMatch
    expect(component.error.isPasswrod1).toBeTrue();
    expect(component.error.isPasswrod2).toBeTrue();
    expect(component.error.passwordsMatch).toBeTrue();

    // Unesite validne lozinke koje se poklapaju
    component.password1 = 'validpassword';
    component.password2 = 'validpassword';
    component.verifyPassword(component.password1, component.password2);

    // Očekujte da errori za lozinku budu resetovani
    expect(component.error.isPasswrod1).toBeFalse();
    expect(component.error.isPasswrod2).toBeFalse();
    expect(component.error.passwordsMatch).toBeFalse();
  });


  it('should call registration service on valid form', () => {
    // Postavite validne vrednosti za formu
    component.email = 'valid@example.com';
    component.username = 'user123';
    component.firstName = 'First';
    component.lastName = 'Last';
    component.password1 = 'validpassword';
    component.password2 = 'validpassword';

    // Simulirajte uspešan odgovor od servisa
    authService.registrationUsers.and.returnValue(of({ status: true }));

    // Pozovite funkciju za kreiranje korisnika
    component.createNewUsers();

    // Očekujte da je servis pozvan
    expect(authService.registrationUsers).toHaveBeenCalled();

    // Očekujte da je korisnik preusmeren na login stranicu
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should show error when registration fails', () => {
    // Postavite validne vrednosti za formu
    component.email = 'valid@example.com';
    component.username = 'user123';
    component.firstName = 'First';
    component.lastName = 'Last';
    component.password1 = 'validpassword';
    component.password2 = 'validpassword';

    // Simulirajte neuspešan odgovor od servisa
    authService.registrationUsers.and.returnValue(of({ status: false }));

    // Pozovite funkciju za kreiranje korisnika
    component.createNewUsers();

    // Očekujte da je error za 'not saved' postavljen na true
    expect(component.error.isNotSaved).toBeTrue();
  });

  it('should handle error when service call fails', () => {
    // Postavite validne vrednosti za formu
    component.email = 'valid@example.com';
    component.username = 'user123';
    component.firstName = 'First';
    component.lastName = 'Last';
    component.password1 = 'validpassword';
    component.password2 = 'validpassword';

    // Simulirajte grešku u pozivu servisa
    authService.registrationUsers.and.returnValue(throwError('Network error'));

    // Pozovite funkciju za kreiranje korisnika
    component.createNewUsers();

    // Očekujte da nije došlo do preusmeravanja na login stranicu
    expect(router.navigate).not.toHaveBeenCalled();

    // Očekujte da je isNotSaved error postavljen na true
    expect(component.error.isNotSaved).toBeTrue();
  });
});
