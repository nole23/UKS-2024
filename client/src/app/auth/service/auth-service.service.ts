import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUsers } from '../models/create-users';
import { map } from 'rxjs/operators';
import { LoginUsers } from '../models/login-users';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Za vraćanje default vrednosti ako dođe do greške

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API_URL = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) { }

  registrationUsers(newUsers: CreateUsers) {
    return this.http.post(this.API_URL + 'create/', newUsers)
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }
      return {status: true}
    }))
  }

  login(loginUser: LoginUsers) {
    return this.http.post(this.API_URL + 'login/', loginUser)
    .pipe(
      map((res: any) => {
        if (!this._checkResponse(res)) {
          return {status: false, message: null}
        }

        this._loginUsers(res.user);
        return {status: true}
      }),
      catchError((error) => {
        // Ovde možeš da obradiš grešku
        if (error.status === 400) {
          return of({ status: false, message: this._errorMessageConvert(error.error.message) });
        } else if (error.status === 500) {
          return of({ status: false, message: 'Server Error. Please try again later.' });
        } else {
          return of({ status: false, message: 'An unexpected error occurred.' });
        }
      })
    );
  }

  sendRestartRequest(email: string) {
    return this.http.post(this.API_URL + 'send-restart-request/', {'email': email})
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      return {status: true}
    }))
  }

  verifyToken(token: string, email: string | null) {
    return this.http.get(this.API_URL + 'verify-token?token=' + token + '&email=' + email + "")
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      localStorage.setItem('token', JSON.stringify({'token': token}))
      return {status: true}
    }))
  }

  generateNewPassword(restart: object) {
    return this.http.put(this.API_URL + 'restart-password/', restart)
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      this._removeLocalstorage();
      return {status: true}
    }))
  }

  _loginUsers(user: any) {
    let aldUser = localStorage.getItem('user');
    if (aldUser !== null) {
      localStorage.removeItem('user');
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;

    if (res.message === 'SUCCESS') return true

    return false;
  }

  _removeLocalstorage(): void {
    localStorage.clear();
  }

  _errorMessageConvert(code: string) {
    if (code === 'INVALID_CREDENTIALS') {
      return 'Email or password is not correct. Try again.'
    }
    return 'Any';
  }
}
