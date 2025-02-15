import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environments'; 

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewSubject = new BehaviorSubject<any>(null); 
  review$ = this.reviewSubject.asObservable(); 

  constructor(private http: HttpClient) {} 

  
  setReview(review: any) {
    this.reviewSubject.next(review); 
  }

  
  getReview() {
    return this.reviewSubject.value; 
  }

  
  putReviews(review: any): Observable<any> {
    const url = `${environment.baseUrl}/reviews`; 
    return this.http.put<any>(url, review); 
  }
}
