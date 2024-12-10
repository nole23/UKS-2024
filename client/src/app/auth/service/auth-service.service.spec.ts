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
    const newUser: CreateUsers = {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      password: ''
    };

    service.registrationUsers(newUser).subscribe(response => {
      expect(response.status).toBe(true); // Ako registracija bude uspešna, očekujemo status true
    });

    const req = httpMock.expectOne('http://localhost:8000/api/users/create/');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'SUCCESS' }); // Simuliraj uspešan odgovor
  });

  it('should login user successfully', () => {
    const loginUser: LoginUsers = { email: 'user@example.com', password: 'password123' };

    service.login(loginUser).subscribe(response => {
      expect(response.status).toBe(true); // Ako je logovanje uspešno, očekujemo status true
    });

    const req = httpMock.expectOne('http://localhost:8000/api/users/login/');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'SUCCESS', user: { id: 1, email: 'user@example.com' } }); // Simuliraj uspešan odgovor
  });

  it('should send restart request successfully', () => {
    const email = 'user@example.com';

    service.sendRestartRequest(email).subscribe(response => {
      expect(response.status).toBe(true); // Očekujemo uspešan odgovor
    });

    const req = httpMock.expectOne('http://localhost:8000/api/users/send-restart-request/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email }); // Proveri da li je telo zahteva ispravno
    req.flush({ message: 'SUCCESS' }); // Simuliraj uspešan odgovor
  });

  it('should verify token and store it in localStorage', () => {
    const token = 'validToken';
    const email = 'user@example.com';

    service.verifyToken(token, email).subscribe(response => {
      expect(response.status).toBe(true); // Očekujemo uspešan odgovor
      expect(localStorage.getItem('token')).toBe(JSON.stringify({ token })); // Proveri da li je token sačuvan u localStorage
    });

    const req = httpMock.expectOne(`http://localhost:8000/api/users/verify-token?token=${token}&email=${email}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'SUCCESS' }); // Simuliraj uspešan odgovor
  });

  it('should generate new password and clear localStorage', () => {
    const restartData = { email: 'user@example.com', password: 'newPassword123', token: 'validToken' };

    spyOn(localStorage, 'clear'); // Špijuniraj clear metodu iz localStorage

    service.generateNewPassword(restartData).subscribe(response => {
      expect(response.status).toBe(true); // Očekujemo uspešan odgovor
      expect(localStorage.clear).toHaveBeenCalled(); // Proveri da li je clear pozvan
    });

    const req = httpMock.expectOne('http://localhost:8000/api/users/restart-password/');
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'SUCCESS' }); // Simuliraj uspešan odgovor
  });

  it('should handle login error', () => {
    const loginUser: LoginUsers = { email: 'user@example.com', password: 'password123' };

    service.login(loginUser).subscribe(response => {
      expect(response.status).toBe(false); // Očekujemo status false zbog greške
      expect(response.message).toBe('Email or password is not correct. Try again.'); // Očekivana greška
    });

    const req = httpMock.expectOne('http://localhost:8000/api/users/login/');
    req.flush({ message: 'INVALID_CREDENTIALS' }, { status: 400, statusText: 'Bad Request' }); // Simuliraj grešku 400
  });

});
