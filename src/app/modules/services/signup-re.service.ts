import { HttpClient } from '@angular/common/http';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private baseUrl="http://localhost:3001"
  //private reviews?;

  constructor(private http: HttpClient) { }

  postUsers( userPost : User): Observable<any>{
    return this.http.post(`${this.baseUrl}/users`, userPost);
  }
}