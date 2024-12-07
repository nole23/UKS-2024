import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; // Dodaj RouterTestingModule
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule], // Uključi RouterTestingModule
      schemas: [NO_ERRORS_SCHEMA], // Ovim se ignorišu greške vezane za nepoznate komponente u testu
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Uzmi instancu Routera
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on successful login', () => {
    // Mock login behavior
    component.username = 'user';
    
    spyOn(router, 'navigate');  // Špijuniraj funkciju navigate

    component.onSubmit();  // Pokreni submit

    expect(router.navigate).toHaveBeenCalledWith(['/']);  // Proveri da li je pozvana funkcija navigate
    expect(localStorage.getItem('token')).toBe('some-token');  // Proveri da li je token sačuvan u localStorage
  });

  it('should show alert on invalid login', () => {
    spyOn(window, 'alert');  // Špijuniraj funkciju alert

    component.username = 'invalid-user';
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Invalid login!');
  });
});
