import { HttpClient } from '@angular/common/http';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private baseUrl="http://localhost:3001"
  //private reviews?;

  constructor(private http: HttpClient) { }

  postReviews( reviewPost : PostReview): Observable<any>{
    return this.http.post(`${this.baseUrl}/reviews`, reviewPost);
  }
}