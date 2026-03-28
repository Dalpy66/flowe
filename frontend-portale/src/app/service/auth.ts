import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../responce/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = '/api/auth';
  private readonly TOKEN_KEY = 'access_token';
 
  constructor(private http: HttpClient) {}
 
  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(response => {
        const storage = rememberMe ? localStorage : sessionStorage;
      }),
      catchError(err => {
        const message = err.error?.message || 'Errore durante il login.';
        return throwError(() => new Error(message));
      })
    );
  }
 
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
 
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }
 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 
  loginWithGoogle(): void {
    window.location.href = `${this.API_URL}/google`;
  }
 
  loginWithGithub(): void {
    window.location.href = `${this.API_URL}/github`;
  }
}

