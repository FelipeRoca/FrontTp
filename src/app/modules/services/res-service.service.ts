import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private baseUrl="http://localhost:3001"
  //private reviews?;

  constructor(private http: HttpClient) { }

  getReviews(){
    return this.http.get(`${this.baseUrl}/reviews`);
  }
}
