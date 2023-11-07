import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class BuscarResService {
    private baseUrl = 'http://localhost:3001';
  
    constructor(private http: HttpClient) { }
  
    getReviewsByCityName(cityName: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/reviews/city/${cityName}`);
    }
  }
