import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
 providedIn: 'root'
})
export class BuscarResService {
    private readonly baseUrl: string = environment.baseUrl;
  
    constructor(private http: HttpClient) { }
  
    getReviewsByCityName(cityName: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/reviews/city/${cityName}`);
    }
  }


