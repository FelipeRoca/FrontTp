import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewId } from '../interfaces/del-review.interface';

@Injectable({
 providedIn: 'root'
})
export class DelResServiceService {
    private baseUrl = 'http://localhost:3001';
  
    constructor(private http: HttpClient) { }
  
    deleteReview(reviewId: ReviewId): Observable<any> {
      // Modifica la URL para incluir el filtro por reviewId
      return this.http.delete(`${this.baseUrl}/reviews/${reviewId.id}`);
    }
 }