import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);  // Mocking Router

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should navigate to /auth if not logged in', () => {
    // Simuliramo da korisnik nije ulogovan
    localStorage.setItem('token', '');  // Setujemo prazan token

    const route: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: '',
      data: {},
      paramMap: {} as any,
      queryParamMap: {} as any,
      root: {} as any,
      parent: null,
      children: [],
      pathFromRoot: [],
      component: null,
      outlet: '',
      routeConfig: null,
      rootParamMap: {} as any
    } as unknown as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;  // Možeš koristiti prazan objekat

    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should allow access if logged in', () => {
    // Simuliramo da je korisnik ulogovan
    localStorage.setItem('token', 'some-token');

    const route: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: '',
      data: {},
      paramMap: {} as any,
      queryParamMap: {} as any,
      root: {} as any,
      parent: null,
      children: [],
      pathFromRoot: [],
      component: null,
      outlet: '',
      routeConfig: null,
      rootParamMap: {} as any
    } as unknown as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;  // Možeš koristiti prazan objekat

    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBeTrue();
  });
});
