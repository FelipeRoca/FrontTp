import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ResServiceService } from 'src/app/modules/services/res-service.service';
import { UnsplashService } from 'src/app/modules/services/unsplash.service';
import { City } from 'src/app/modules/interfaces/city.interface'; 

@Component({
  selector: 'app-city-cards',
  templateUrl: './city-cards.component.html',
  styleUrls: ['./city-cards.component.css']
})
export class CityCardsComponent implements OnInit {
  @Output() selectCity = new EventEmitter<string>();
  cities: City[] = [];
  private defaultImage = 'https://cdn.pixabay.com/photo/2016/09/12/17/00/antwerp-1665194_640.jpg';    //imagen por defecto

  constructor(
    private resService: ResServiceService,
    private unsplashService: UnsplashService
  ) {}

  ngOnInit() {
    this.resService.getReviews().subscribe(
      (reviews: any[]) => {  
        const allCities = reviews.map(review => review.City.name);
        const uniqueCities = [...new Set(allCities)];                               // elimina duplicados
        const selectedCities = this.seleccionarCiudadesAleatorias(uniqueCities, 5); 

 
        this.cities = selectedCities.map(cityName => ({
          name: cityName,
          image: this.defaultImage
        }));

        
        this.cities.forEach((city, index) => {
          this.unsplashService.obtenerImagenesDeCiudad(city.name).subscribe(
            (response: any) => {
              const urlImagen = (response.results && response.results.length > 0)
                ? response.results[0].urls.regular
                : this.defaultImage;
              this.cities[index].image = urlImagen;
            },
            error => {
              console.error(`Error al obtener imagen para ${city.name}:`, error);
              this.cities[index].image = this.defaultImage;
            }
          );
        });
      },
      error => {
        console.error('Error obteniendo las ciudades', error);
      }
    );
  }

  seleccionarCiudadesAleatorias(ciudades: string[], cantidad: number): string[] {
    if (ciudades.length <= cantidad) {
      return ciudades;  // devuelve todas si hay pocas 
    }
    return ciudades.sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

  select(cityName: string) {
    this.selectCity.emit(cityName);
  }
}
