import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, SignupRequest } from '../interfaces/iuser';
import { env } from '../../../../environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient)
  constructor() { }



  signUp(userData:SignupRequest):Observable<any>{
    return this._http.post(`${env.BASE_URL}/users`,userData)
  }
  login(credentials: LoginRequest): Observable<any> {
    return this._http.post(`${env.BASE_URL}/auth/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }



  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
