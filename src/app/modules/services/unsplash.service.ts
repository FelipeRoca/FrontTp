import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  private apiUrl = 'https://api.unsplash.com/search/photos';
  private accessKey = 'xHGh4OIkZ6B3caDy97lZY2vdR4F2wpEJmFVHZMwb2NM';

  constructor(private http: HttpClient) {}

  obtenerImagenesDeCiudad(ciudad: string): Observable<any> {
    const params = new HttpParams()
      .set('query', ciudad)
      .set('client_id', this.accessKey)  
      .set('per_page', '10');  

    return this.http.get(this.apiUrl, { params });
  }
}
