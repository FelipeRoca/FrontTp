import { Component, OnInit } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';
import { WeatherService } from '../services/weather.service';  // Importar el servicio de clima
import { GeocodeService } from '../services/geocode.service';  // Importar el servicio de geocodificación
import { MenuItem } from 'primeng/api';
import * as L from 'leaflet';
import { YoutubeService } from '../../services/youtube.service';


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
  videos: any[] = [];

  weather: string = '';
  temperature: number | null = null;
  humidity: number | null = null;

  constructor(
    private resServiceService: ResServiceService,
    private buscarResService: BuscarResService,
    private weatherService: WeatherService,  // Inyectar WeatherService
    private geocodeService: GeocodeService, // Inyectar GeocodeService
    private youtubeService: YoutubeService 
  ) {}

  ngOnInit(): void {
        this.resServiceService.getReviews().subscribe((reviews: any) => {
      this.reviews = Array.isArray(reviews) ? reviews : [reviews];
      console.log(this.reviews);

      this.inicializarMapa();
      this.geocodeYMostrarLugaresEnMapa();
      this.getVideos('');
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
      this.getVideos(this.selectedCity);
    });
  }

  // Obtener hoteles desde TripAdvisor
  getTripAdvisorHotels(city: string) {
    this.tripAdvisorSearchUrl = `https://www.tripadvisor.com/Search?q=hotels+in+${encodeURIComponent(city)}`;
    this.showTripAdvisor = true;
  }


  getVideos(city: string): void {
    if (city.trim() === '') {
      console.log('No hay búsqueda, cargando videos por defecto...');
      this.youtubeService.buscarVideosPorDefecto().subscribe(response => {
        this.procesarRespuesta(response);
      }, error => {
        console.error('Error al obtener videos por defecto de YouTube', error);
      });
    } else {
      this.youtubeService.buscarVideos(city).subscribe(response => {
        this.procesarRespuesta(response);
      }, error => {
        console.error('Error al obtener videos de YouTube', error);
      });
    }
  }
  
  // ✅ Función para procesar la respuesta de la API y extraer los videos
  private procesarRespuesta(response: any): void {
    console.log('Respuesta de la API de YouTube:', response);
    if (response.items && response.items.length > 0) {
      this.videos = response.items.map((item: any) => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    } else {
      console.warn('No se encontraron videos.');
      this.videos = [];
    }
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
