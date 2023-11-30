

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/app/environments/environments';

import { AuthStatus, User, LoginResponse, RegisterResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  // Puede ser nulo en un determinado punto del tiempo
  private _currentUser = signal<User | null>(null);

  // Nos sirve para saber si el usuario está autenticado
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient) {

  }


  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    // Almacenamos el token en el localStorage para poder recuperar los datos del usuario en caso de una recarga del navegador
    localStorage.setItem('token', token);

    return true;
  }

  findByEmail(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/${email}`;

    return this.http.get<boolean>(url);
  }

  login(email: string, password: string): Observable<boolean> {
    // URL para realizar el método POST
    const url = `${this.baseUrl}/login`;

    // BODY con la información que mandaremos en el POST. El body de la petición únicamente debido a cómo se construyó el backend solo puede recibir el email y el password
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        // Disparamos un efecto secundario de la petición para almacenar los datos de la respuesta
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
    localStorage.removeItem('token');
  }
}
