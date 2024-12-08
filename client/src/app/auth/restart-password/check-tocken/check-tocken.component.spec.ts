import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckTockenComponent } from './check-tocken.component';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs'; // Uvezi RxJS za mock odgovore
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CheckTockenComponent', () => {
  let component: CheckTockenComponent;
  let fixture: ComponentFixture<CheckTockenComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Kreiraj mock verziju AuthServiceService i Router
    authServiceMock = jasmine.createSpyObj('AuthServiceService', ['verifyToken']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CheckTockenComponent],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },  // Mockuj AuthService
        { provide: Router, useValue: routerMock } // Mockuj Router
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignoriši eventualne nepoznate komponente
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckTockenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verifyToken and navigate on successful token', () => {
    const mockResponse = { status: true }; // Mock odgovora sa statusom true
    authServiceMock.verifyToken.and.returnValue(of(mockResponse)); // Vraća mock odgovarajući Observable

    component.token = 'validToken';
    component.verifyToken();  // Pozovi metodu za verifikaciju tokena

    expect(authServiceMock.verifyToken).toHaveBeenCalledWith('validToken'); // Proveri da li je verifyToken pozvan sa pravim tokenom
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/new_password']); // Proveri da li je pozvana navigacija
  });

  it('should set isErrorToken to true when token verification fails', () => {
    const mockResponse = { status: false }; // Mock odgovora sa statusom false
    authServiceMock.verifyToken.and.returnValue(of(mockResponse)); // Vraća mock odgovarajući Observable

    component.token = 'invalidToken';
    component.verifyToken();  // Pozovi metodu za verifikaciju tokena

    expect(component.isErrorToken).toBeTrue(); // Proveri da li je isErrorToken postavljen na true
  });

  it('should not call verifyToken if token is empty', () => {
    component.token = '';  // Postavi prazan token
    component.verifyToken();  // Pozovi metodu

    expect(authServiceMock.verifyToken).not.toHaveBeenCalled();  // Proveri da verifyToken nije pozvan
  });
});
