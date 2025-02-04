import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  geocodeDireccion(direccion: string): Observable<any> {
    const url = `${this.baseUrl}?format=json&q=${encodeURIComponent(direccion)}`;
    return this.http.get(url);
  }
}
