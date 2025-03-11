import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environments';
import { AuthStatus, User, LoginResponse, RegisterResponse } from '../interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient, private storageService: StorageService) {
    const token = this.storageService.getToken();
    if (token) {
      this._authStatus.set(AuthStatus.authenticated);
    } else {
      this._authStatus.set(AuthStatus.notAuthenticated);
    }
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.storageService.setToken(token);
    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ us, tok }) => this.setAuthentication(us, tok)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  
  register(body: User): Observable<string> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map(({ msj }) => msj),
        catchError(err => throwError(() => err.error.message))
      );
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.storageService.removeToken();
  }

  isAuthenticated(): boolean {
    return this._authStatus() === AuthStatus.authenticated;
  }
}
