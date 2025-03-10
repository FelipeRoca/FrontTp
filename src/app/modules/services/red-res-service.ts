import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postReviews( reviewPost : PostReview): Observable<any>{
    return this.http.post(`${this.baseUrl}/reviews`, reviewPost);
  }
}