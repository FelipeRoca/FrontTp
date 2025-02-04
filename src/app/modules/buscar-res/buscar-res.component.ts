
// import { Component, OnInit } from '@angular/core';
// import { ResServiceService } from '../services/res-service.service';
// import { BuscarResService } from '../services/buscar-res.service';
// import { MenuItem } from 'primeng/api';
// import { HttpClient } from '@angular/common/http';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-buscar-res',
//   templateUrl: './buscar-res.component.html',
//   styleUrls: ['./buscar-res.component.css']
// })
// export class BuscarResComponent implements OnInit {
//   reviews: any[] = [];
//   items: MenuItem[] | undefined;
//   map: L.Map | undefined;
//   resButton: boolean = false;
//   showTripAdvisor: boolean = false;
//   selectedCity: string = '';
//   tripAdvisorSearchUrl: string = '';

//   weather: string = '';
//   temperature: number | null = null;
//   humidity: number | null = null;

//   constructor(
//     private resServiceService: ResServiceService,
//     private buscarResService: BuscarResService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.items = [
//       {
//         label: 'Inicio',
//         routerLink: ['/inicio'],
//         icon: 'pi pi-fw pi-file',
//         items: []
//       },
//       {
//         label: 'Iniciar Sesion',
//         routerLink: ['/iniciar-sesion'],
//         icon: 'pi pi-fw pi-user',
//         items: []
//       },
//       {
//         label: 'Registrarse',
//         routerLink: ['/registrarse'],
//         icon: 'pi pi-fw pi-calendar',
//         items: []
//       },
//     ];

    

//     this.resServiceService.getReviews().subscribe((reviews: any) => {
//       this.reviews = Array.isArray(reviews) ? reviews : [reviews];
//       console.log(this.reviews);

//       this.inicializarMapa();
//       this.geocodeYMostrarLugaresEnMapa();
//     });
//   }

//   getWeather(cityName: string): void {
//     const apiKey = '783c00ab61d5af6f40597c14d87c35dd';
//     const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(cityName)}`;


//     this.http.get(url).subscribe((data: any) => {
//       if (data && data.current) {
//         const temp = data.current.temperature;
//         const weatherDesc = data.current.weather_descriptions[0];
//         const humidity = data.current.humidity;
//         this.weather = weatherDesc;
//         this.temperature = temp;
//         this.humidity = humidity;
//       } else {
//         console.error('No se pudo obtener el clima para la ciudad');
//       }
//     });
//   }

//   inicializarMapa() {
//     this.map = L.map('map').setView([0, 0], 2);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//   }

//   geocodeYMostrarLugaresEnMapa() {
//     if (!this.map) {
//       console.error('El mapa no está inicializado.');
//       return;
//     }

//     this.reviews.forEach(review => {
//       const direccion = `${review.City.name}, ${review.City.Country.name}`;
//       this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
//         const location = result[0];
//         if (location && location.lat && location.lon) {
//           const marker = L.marker([location.lat, location.lon]).addTo(this.map!);
//           marker.bindPopup(direccion).openPopup();
//         } else {
//           console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
//         }
//       });
//     });
//   }

//   geocodeDireccionNominatim(direccion: string) {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
//     return this.http.get(url);
//   }

//   buscarReview(cityName: any, countryName: any): void {
//     console.log(cityName, countryName);
//     const direccion = `${cityName.value}, ${countryName.value}`;
//     this.resButton = true;
    
//     this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
//       if (Array.isArray(reviews)) {
//         this.reviews = reviews;
//       } else {
//         this.reviews = [reviews];
//       }
//       console.log(this.reviews);

//       this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
//         const location = result[0];
//         if (location && location.lat && location.lon && this.map) {
//           this.map.setView([location.lat, location.lon], 10);
//         } else {
//           console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
//         }
//       });
//     });
//   }

//   mostrarInput(valor: any): void {
//     this.selectedCity = valor.value;
//     this.buscarResService.getReviewsByCityName(valor.value).subscribe(reviews => {
//       if (Array.isArray(reviews)) {
//         this.reviews = reviews;
//       } else {
//         this.reviews = [reviews];
//       }
//       console.log(this.reviews);

//       const ciudad = this.reviews[0].City;
//       const direccion = `${ciudad.name}, ${ciudad.Country.name}`;
//       this.geocodeDireccionNominatim(direccion).subscribe((result: any) => {
//         const location = result[0];
//         if (location && location.lat && location.lon && this.map) {
//           this.map.setView([location.lat, location.lon], 10);
//         } else {
//           console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
//         }
//       });

//       this.getTripAdvisorHotels(this.selectedCity);
//       this.getWeather(this.selectedCity);
//     });
//   }

//   getTripAdvisorHotels(city: string) {
//     this.tripAdvisorSearchUrl = `https://www.tripadvisor.com/Search?q=hotels+in+${encodeURIComponent(city)}`;
//     this.showTripAdvisor = true;
//   }

//   restablecerCiudades(): void {
//     this.resServiceService.getReviews().subscribe((reviews: any) => {
//       this.reviews = Array.isArray(reviews) ? reviews : [reviews];
//       console.log(this.reviews);
//       if (this.map) {
//         this.map.remove();
//       }
      
//       this.inicializarMapa();
//       this.geocodeYMostrarLugaresEnMapa();
//       this.showTripAdvisor = false;
//       this.tripAdvisorSearchUrl = '';
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';
import { WeatherService } from '../services/weather.service';  // Importar el servicio de clima
import { GeocodeService } from '../services/geocode.service';  // Importar el servicio de geocodificación
import { MenuItem } from 'primeng/api';
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
  resButton: boolean = false;
  showTripAdvisor: boolean = false;
  selectedCity: string = '';
  tripAdvisorSearchUrl: string = '';

  weather: string = '';
  temperature: number | null = null;
  humidity: number | null = null;

  constructor(
    private resServiceService: ResServiceService,
    private buscarResService: BuscarResService,
    private weatherService: WeatherService,  // Inyectar WeatherService
    private geocodeService: GeocodeService,  // Inyectar GeocodeService
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

  // Usamos el WeatherService para obtener el clima
  getWeather(cityName: string): void {
    this.weatherService.getWeather(cityName).subscribe((data: any) => {
      if (data && data.current) {
        this.weather = data.current.weather_descriptions[0];
        this.temperature = data.current.temperature;
        this.humidity = data.current.humidity;
      } else {
        console.error('No se pudo obtener el clima para la ciudad');
      }
    });
  }

  // Inicializar el mapa
  inicializarMapa() {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // Mostrar lugares en el mapa utilizando geocodificación
  geocodeYMostrarLugaresEnMapa() {
    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }

    this.reviews.forEach(review => {
      const direccion = `${review.City.name}, ${review.City.Country.name}`;
      this.geocodeService.geocodeDireccion(direccion).subscribe((result: any) => {
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

  // Buscar reseñas por ciudad
  buscarReview(cityName: any, countryName: any): void {
    console.log(cityName, countryName);
    const direccion = `${cityName.value}, ${countryName.value}`;
    this.resButton = true;
    
    this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
      if (Array.isArray(reviews)) {
        this.reviews = reviews;
      } else {
        this.reviews = [reviews];
      }
      console.log(this.reviews);

      this.geocodeService.geocodeDireccion(direccion).subscribe((result: any) => {
        const location = result[0];
        if (location && location.lat && location.lon && this.map) {
          this.map.setView([location.lat, location.lon], 10);
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });
    });
  }

  // Mostrar información de la ciudad seleccionada
  mostrarInput(valor: any): void {
    this.selectedCity = valor.value;
    this.buscarResService.getReviewsByCityName(valor.value).subscribe(reviews => {
      if (Array.isArray(reviews)) {
        this.reviews = reviews;
      } else {
        this.reviews = [reviews];
      }
      console.log(this.reviews);

      const ciudad = this.reviews[0].City;
      const direccion = `${ciudad.name}, ${ciudad.Country.name}`;
      this.geocodeService.geocodeDireccion(direccion).subscribe((result: any) => {
        const location = result[0];
        if (location && location.lat && location.lon && this.map) {
          this.map.setView([location.lat, location.lon], 10);
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });

      this.getTripAdvisorHotels(this.selectedCity);
      this.getWeather(this.selectedCity);
    });
  }

  // Obtener hoteles desde TripAdvisor
  getTripAdvisorHotels(city: string) {
    this.tripAdvisorSearchUrl = `https://www.tripadvisor.com/Search?q=hotels+in+${encodeURIComponent(city)}`;
    this.showTripAdvisor = true;
  }

  // Restablecer ciudades
  restablecerCiudades(): void {
    this.resServiceService.getReviews().subscribe((reviews: any) => {
      this.reviews = Array.isArray(reviews) ? reviews : [reviews];
      console.log(this.reviews);
      if (this.map) {
        this.map.remove();
      }
      
      this.inicializarMapa();
      this.geocodeYMostrarLugaresEnMapa();
      this.showTripAdvisor = false;
      this.tripAdvisorSearchUrl = '';
    });
  }
}
