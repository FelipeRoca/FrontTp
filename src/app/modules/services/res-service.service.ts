import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getReviews(){
    return this.http.get(`${this.baseUrl}/reviews`);
  }
}
