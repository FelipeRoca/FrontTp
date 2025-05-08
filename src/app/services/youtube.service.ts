import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyAqQJS2NB-zL2sgk1DUGl-lAFny9--ALhc'; 
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  //videos según ciudad
  buscarVideos(ciudad: string): Observable<any> {
    const url = `${this.apiUrl}?part=snippet&type=video&q=${encodeURIComponent(ciudad)} turismo&maxResults=3&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  //videos al azar si no hay búsqueda
  buscarVideosPorDefecto(): Observable<any> {
    const temas = ['viajes', 'turismo', 'destinos increíbles', 'playas hermosas', 'ciudades hermosas'];
    const temaAleatorio = temas[Math.floor(Math.random() * temas.length)];                                      //para q la busca sea aleatoria. multiplicamos un nro entre 0y 1 por la long de posibles resultados y redondeamos(floor) p q salga uno de ellos
    const url = `${this.apiUrl}?part=snippet&type=video&q=${encodeURIComponent(temaAleatorio)}&maxResults=3&key=${this.apiKey}`;
    console.log('Cargando videos por defecto:', url);
    return this.http.get<any>(url);
  }
}




//part=snippet para q devuelva la parte de snippet que contiene el titulo y demas
//type=video pq sino puede mandar shorts 