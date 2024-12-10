import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Importuj AuthGuard
import { CommonService } from './services/common.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let commonServiceMock: jasmine.SpyObj<CommonService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Kreiraj mockove za CommonService i Router
    commonServiceMock = jasmine.createSpyObj('CommonService', ['checkUserLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Kreiraj TestBed za AuthGuard
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Za testiranje ruter funkcionalnosti
      providers: [
        AuthGuard,
        { provide: CommonService, useValue: commonServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    // Instanciraj AuthGuard iz TestBed-a
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    // Postavi mock da vrati true, kao da je korisnik ulogovan
    commonServiceMock.checkUserLoggedIn.and.returnValue(true);

    // Pokreni canActivate
    const result = authGuard.canActivate();

    // Proveri da li je rezultat true (dozvoljen je pristup)
    expect(result).toBe(true);
  });

  it('should redirect to /auth if user is not logged in', () => {
    // Postavi mock da vrati false, kao da korisnik nije ulogovan
    commonServiceMock.checkUserLoggedIn.and.returnValue(false);

    // Pokreni canActivate
    const result = authGuard.canActivate();

    // Proveri da li je preusmereno na /auth
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth']);
    expect(result).toBe(false);  // Pristup je blokiran
  });
});
