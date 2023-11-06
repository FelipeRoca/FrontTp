import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class ResServiceService {
    private baseUrl = 'http://localhost:3001';
  
    constructor(private http: HttpClient) { }
  
    getReviewsByUserId(userId: number): Observable<any> {
      // Modifica la URL para incluir el filtro por userId
      return this.http.get(`${this.baseUrl}/reviews/usuario/${userId}`);
    }
  }

