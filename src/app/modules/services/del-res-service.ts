import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewId } from '../interfaces/del-review.interface';
import { environment } from 'src/app/environments/environments';

@Injectable({
 providedIn: 'root'
})
export class DelResServiceService {
    private readonly baseUrl: string = environment.baseUrl;
  
    constructor(private http: HttpClient) { }
  
    deleteReview(reviewId: ReviewId): Observable<any> {
      return this.http.delete(`${this.baseUrl}/reviews/${reviewId.id}`);
    }
 }