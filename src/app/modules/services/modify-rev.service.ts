import { HttpClient } from '@angular/common/http';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PutReview } from '../interfaces/modify-rev.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private baseUrl="http://localhost:3001"
  //private reviews?;

  constructor(private http: HttpClient) { }

// En ResServiceService
putReviews(reviewPut: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reviews/${reviewPut.id}`, reviewPut);
  }

  getReviewById(reviewId: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/reviews/${reviewId}`)
  }
}