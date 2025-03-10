import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

putReviews(reviewPut: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reviews/${reviewPut.id}`, reviewPut);
  }

  getReviewById(reviewId: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/reviews/${reviewId}`)
  }
}