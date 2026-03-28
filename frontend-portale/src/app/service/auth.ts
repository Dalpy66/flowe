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
  private url: string = "localhost:8080"
 
  constructor(private http: HttpClient) {}
 
  login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.url + "/utenti/login/1");
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

