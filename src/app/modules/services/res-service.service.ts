// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/app/environments/environments';

// @Injectable({
//   providedIn: 'root'
// })
// export class ResServiceService {
//   private readonly baseUrl: string = environment.baseUrl;

//   constructor(private http: HttpClient) { }

//   getReviews(){
//     return this.http.get(`${this.baseUrl}/reviews`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Asegúrate de importar Observable
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResServiceService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Especificamos que la respuesta será un arreglo de objetos de tipo 'any'
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`);
  }
}
