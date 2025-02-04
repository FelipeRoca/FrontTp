import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environments'; 

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewSubject = new BehaviorSubject<any>(null); // Inicia con un valor nulo
  review$ = this.reviewSubject.asObservable(); // Observable para que otros componentes puedan suscribirse a los cambios

  constructor(private http: HttpClient) {} // Inyecta HttpClient para hacer solicitudes HTTP

  // Método para establecer una revisión
  setReview(review: any) {
    this.reviewSubject.next(review); // Actualiza la revisión
  }

  // Método para obtener la revisión
  getReview() {
    return this.reviewSubject.value; // Obtiene la revisión actual
  }

  // Método para actualizar la revisión en el servidor (puedes cambiar la URL según tu API)
  putReviews(review: any): Observable<any> {
    const url = `${environment.baseUrl}/reviews`; // Usa la URL de tu API
    return this.http.put<any>(url, review); // Enviar una solicitud PUT con la revisión
  }
}
