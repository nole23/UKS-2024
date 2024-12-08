import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceService } from './auth-service.service';
import { CreateUsers } from '../models/create-users';
import { LoginUsers } from '../models/login-users';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController; // Mockovanje HTTP zahteva

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Dodajemo HttpClientTestingModule za simulaciju HTTP zahteva
      providers: [AuthServiceService] // Obavezno obezbedite servis
    });

    service = TestBed.inject(AuthServiceService); // Injektovanje servisa
    httpMock = TestBed.inject(HttpTestingController); // Injektovanje HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Verifikovanje da li su svi HTTP zahtevi završeni
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test da li je servis uspešno kreiran
  });

  it('should register a new user', () => {
    const newUser = new CreateUsers({
      email: 'test@test.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      password: 'Test1234'
    });

    const mockResponse = { status: true };

    service.registrationUsers(newUser).subscribe(response => {
      expect(response.status).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8000/registration');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simuliramo odgovor sa servera
  });

  it('should login a user', () => {
    const loginUser = new LoginUsers({
      username: 'testuser',
      password: 'Test1234'
    });

    const mockResponse = { status: true, user: { username: 'testuser', firstName: 'Test', lastName: 'User' } };

    service.login(loginUser).subscribe(response => {
      expect(response.status).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8000/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simuliramo odgovor sa servera
  });

  it('should send restart request', () => {
    const email = 'test@test.com';
    const mockResponse = { status: true };

    service.sendRestartRequest(email).subscribe(response => {
      expect(response.status).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8000/send-restart-request');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simuliramo odgovor sa servera
  });

  it('should verify token', () => {
    const token = 'testtoken';
    const mockResponse = { status: true };

    service.verifyToken(token).subscribe(response => {
      expect(response.status).toBeTrue();
    });

    const req = httpMock.expectOne(`http://localhost:8000/verify-token/${token}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simuliramo odgovor sa servera
  });

  it('should generate new password', () => {
    const newPasswordData = { newPassword: 'NewPassword123' };
    const mockResponse = { status: true };

    service.generateNewPassword(newPasswordData).subscribe(response => {
      expect(response.status).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8000/restart-password');
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse); // Simuliramo odgovor sa servera
  });
});
