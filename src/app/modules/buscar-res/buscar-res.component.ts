
import { Component, OnInit } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';
import { WeatherService } from '../services/weather.service';  
import { GeocodeService } from '../services/geocode.service';  
import { MenuItem } from 'primeng/api';
import * as L from 'leaflet';
import { YoutubeService } from '../../services/youtube.service';
import { UnsplashService } from '../services/unsplash.service';  
import { ActivatedRoute } from '@angular/router';

type Clima = "Sunny" | "Partly cloudy" | "Cloudy" | "Rainy" | "Stormy" | "Windy" | "Foggy" | "Snowy" | "Overcast" | "Clear" | "Thunderstorm" | "Drizzle" | "Mist";

@Component({
  selector: 'app-buscar-res',
  templateUrl: './buscar-res.component.html',
  styleUrls: ['./buscar-res.component.css']
})

export class BuscarResComponent implements OnInit {
  reviews: any[] = [];
  items: MenuItem[] | undefined;
  map: L.Map | undefined;
  showTripAdvisor: boolean = false;
  selectedCity: string = '';
  tripAdvisorSearchUrl: string = '';
  videos: any[] = [];
  weather: string = '';
  temperature: number | null = null;
  humidity: number | null = null;
  imagenes: any[] = [];  
  restablecer: boolean = false;

  constructor(
    private resServiceService: ResServiceService,
    private buscarResService: BuscarResService,
    private weatherService: WeatherService,  
    private geocodeService: GeocodeService, 
    private youtubeService: YoutubeService,
    private unsplashService: UnsplashService,
    private activatedRoute: ActivatedRoute,  
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(params => {   //p obtener la ciudad
      const ciudad = params['city'];

      if (ciudad) {
        this.selectedCity = ciudad;
        this.buscarResService.getReviewsByCityName(ciudad).subscribe(reviews => {
          if (Array.isArray(reviews)) {
            this.reviews = reviews;
          } else {
            this.reviews = [reviews];
          }

          console.log(this.reviews);
          this.inicializarMapa();
          const ciudad = this.reviews[0].City;
          const direccion = `${ciudad.name}, ${ciudad.Country.name}`;
          this.geocodeService.geocodeDireccion(direccion).subscribe((result: any) => {
            const location = result[0];
            if (location && location.lat && location.lon && this.map) {
              const marker = L.marker([location.lat, location.lon]).addTo(this.map!);   //para crear unmarcador  y agrwegarlo al mapa
              marker.bindPopup(direccion).openPopup();  
              this.map.setView([location.lat, location.lon], 10);
            } else {
              console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
            }
          });

          this.restablecer = true;
          this.getTripAdvisorHotels(this.selectedCity);
          this.getWeather(this.selectedCity);
          this.getVideos(this.selectedCity);
          this.buscarImagenesDeCiudad(this.selectedCity);
        });
      } else {                  //si no viene por la card q muestre todo
        this.resServiceService.getReviews().subscribe((reviews: any) => {
          this.reviews = Array.isArray(reviews) ? reviews : [reviews];
          console.log(this.reviews);

          this.inicializarMapa();
          this.geocodeYMostrarLugaresEnMapa();
          this.getVideos('');
        });
      }
    });
  }

  getWeather(cityName: string): void {
    this.weatherService.getWeather(cityName).subscribe((data: any) => {
      if (data && data.current) {
        this.weather = this.traducirClima(data.current.weather_descriptions[0]);
        this.temperature = data.current.temperature;
        this.humidity = data.current.humidity;
      } else {
        console.error('No se pudo obtener el clima para la ciudad');
      }
    });
  }

  traducirClima(estado: string): string {
    const condiciones: { [key in Clima]: string } = {
      Sunny: "Soleado",
      "Partly cloudy": "Parcialmente nublado",
      Cloudy: "Nublado",
      Rainy: "Lluvia",
      Stormy: "Tormentoso",
      Windy: "Ventoso",
      Foggy: "Con niebla",
      Snowy: "Nevado",
      Overcast: "Nublado",
      Clear: "Despejado",
      Thunderstorm: "Tormenta electrica",
      Drizzle: "Llovizna",
      Mist: "Neblina"
    };

    return condiciones[estado as Clima] || estado;
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
      this.geocodeService.geocodeDireccion(direccion).subscribe((result: any) => {
        const location = result[0];                                     //devuelve un array de locations, elegimos la primera
        if (location && location.lat && location.lon) {
          const marker = L.marker([location.lat, location.lon]).addTo(this.map!);   //para crear unmarcador  y agrwegarlo al mapa
          marker.bindPopup(direccion).openPopup();                  //para q al hacer click en un marcadoer se vea el nombre de la ciudad
        } else {
          console.warn(`No se encontraron coordenadas para la dirección: ${direccion}`);
        }
      });
    });
  }



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
      this.restablecer = true;
      this.getTripAdvisorHotels(this.selectedCity);
      this.getWeather(this.selectedCity);
      this.getVideos(this.selectedCity);
      this.buscarImagenesDeCiudad(this.selectedCity);
    });
  }

  
  buscarImagenesDeCiudad(ciudad: string): void {
    this.unsplashService.obtenerImagenesDeCiudad(ciudad).subscribe((data: any) => {
      this.imagenes = data.results;  
      console.log(this.imagenes);  
    }, (error) => {
      console.error('Error al obtener imágenes de Unsplash', error);
    });
  }

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

  restablecerCiudades(): void {
    this.resServiceService.getReviews().subscribe((reviews: any) => {
      this.reviews = Array.isArray(reviews) ? reviews : [reviews];
      console.log(this.reviews);
      
      this.weather = '';
      this.temperature = null;
      this.humidity = null;
      
      if (this.map) {
        this.map.remove();
      }
      
      this.inicializarMapa();
      this.geocodeYMostrarLugaresEnMapa();
      this.showTripAdvisor = false;
      this.tripAdvisorSearchUrl = '';
      this.getVideos('');
      this.imagenes = [];  
      this.restablecer = false;
    });
  }
}
