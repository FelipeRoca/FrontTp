import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '783c00ab61d5af6f40597c14d87c35dd';
  private baseUrl = 'https://api.weatherstack.com/current';

  constructor(private http: HttpClient) { }

  getWeather(cityName: string): Observable<any> {
    const url = `${this.baseUrl}?access_key=${this.apiKey}&query=${encodeURIComponent(cityName)}`;
    return this.http.get(url);
  }
}
