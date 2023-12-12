

import { Component, OnInit } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-buscar-res',
  templateUrl: './buscar-res.component.html',
  styleUrls: ['./buscar-res.component.css']
})
export class BuscarResComponent implements OnInit {
  reviews: any[] = [];
  items: MenuItem[] | undefined;
  map: L.Map | undefined;

  constructor(
    private resServiceService: ResServiceService,
    private buscarResService: BuscarResService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        routerLink: ['/inicio'],
        icon: 'pi pi-fw pi-file',
        items: [] 
      },
      {
        label: 'Iniciar Sesion',
        routerLink: ['/iniciar-sesion'],
        icon: 'pi pi-fw pi-user',
        items: []
      },
      {
        label: 'Registrarse',
        routerLink: ['/registrarse'],
        icon: 'pi pi-fw pi-calendar',
        items: []
      },
    ];

    this.resServiceService.getReviews().subscribe((reviews: any) => {
      this.reviews = Array.isArray(reviews) ? reviews : [reviews];
      console.log(this.reviews);


      this.inicializarMapa();
      this.geocodeYMostrarLugaresEnMapa();
    });
  }

  inicializarMapa() {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  geocodeYMostrarLugaresEnMapa() {
    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }

    this.reviews.forEach(review => {
      const direccion = `${review.City.name}, ${review.City.Country.name}`;
      this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
        const location = result[0];
        if (location && location.lat && location.lon) {
          const marker = L.marker([location.lat, location.lon]).addTo(this.map!);
          marker.bindPopup(direccion).openPopup();
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });
    });
  }

  geocodeDireccionNominatim(direccion: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    return this.http.get(url);
  }

  buscarReview(cityName: any, countryName: any): void {
    console.log(cityName, countryName);
    const direccion = `${cityName.value}, ${countryName.value}`;
    
    this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
      if (Array.isArray(reviews)) {
        this.reviews = reviews;
      } else {
        this.reviews = [reviews];
      }
      console.log(this.reviews);

      this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
        const location = result[0];
        if (location && location.lat && location.lon && this.map) {
          this.map.setView([location.lat, location.lon], 10);
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });
    });
  }

  mostrarInput(valor: any): void {
    this.buscarResService.getReviewsByCityName(valor.value).subscribe(reviews => {
      if (Array.isArray(reviews)) {
        this.reviews = reviews;
      } else {
        this.reviews = [reviews];
      }
      console.log(this.reviews);

      const ciudad = this.reviews[0].City;
      const direccion = `${ciudad.name}, ${ciudad.Country.name}`;
      this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
        const location = result[0];
        if (location && location.lat && location.lon && this.map) {
          this.map.setView([location.lat, location.lon], 10);
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });
    });
  }
  restablecerCiudades(): void {
    this.resServiceService.getReviews().subscribe((reviews: any) => {
      this.reviews = Array.isArray(reviews) ? reviews : [reviews];
      console.log(this.reviews);
        if (this.map) {
          this.map.remove();
        }
      
        this.inicializarMapa();
        this.geocodeYMostrarLugaresEnMapa();
      }
    );
  }

}
