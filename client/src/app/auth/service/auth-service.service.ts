import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUsers } from '../models/create-users';
import { map } from 'rxjs/operators';
import { LoginUsers } from '../models/login-users';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API_URL = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  registrationUsers(newUsers: CreateUsers) {
    return this.http.post(this.API_URL + 'registration', newUsers)
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }
      return {status: true}
    }))
  }

  login(loginUser: LoginUsers) {
    return this.http.post(this.API_URL + 'login', loginUser)
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      this._loginUsers(res.user);
      return {status: true}
    }))
  }

  sendRestartRequest(email: string) {
    return this.http.post(this.API_URL + 'send-restart-request', {'email': email})
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      return {status: true}
    }))
  }

  verifyToken(token: string) {
    return this.http.get(this.API_URL + 'verify-token/' + token)
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      return {status: true}
    }))
  }

  generateNewPassword(restart: object) {
    return this.http.put(this.API_URL + 'restart-password', {'newPassword': restart})
    .pipe(map((res: any) => {
      if (!this._checkResponse(res)) {
        return {status: false, message: null}
      }

      return {status: true}
    }))
  }

  _loginUsers(user: any) {
    let aldUser = localStorage.getItem(user.username);
    if (aldUser !== null) {
      localStorage.removeItem(user.username);
    }

    localStorage.setItem(user.username, JSON.stringify(user));
  }

  _checkResponse(res: any) {
    if (res.message === undefined) return true;

    if (res.message === 'SUCCESS') return true

    return false;
  }
}
