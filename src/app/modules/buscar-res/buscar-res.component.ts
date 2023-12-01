import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';
import { MenuItem } from 'primeng/api';


// @Component({
//   selector: 'app-buscar-res',
//   templateUrl: './buscar-res.component.html',
//   styleUrls: ['./buscar-res.component.css']
// })
// export class BuscarResComponent implements OnInit{
//   ngOnInit(): void {
//     this.resServiceService.getReviews().subscribe(reviews => {
//       this.reviews = reviews
//       console.log(this.reviews)
//     })
//   }

//   private resServiceService = inject(ResServiceService)
//   private buscarResService = inject(BuscarResService)


//   public reviews:any=[]

//    buscarReview(cityName: any): void {
//      console.log(cityName)
//      this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
//        this.reviews = reviews
//        console.log(this.reviews) 

//     })
//  }







// mostrarInput(valor: any){
//   this.buscarResService.getReviewsByCityName(valor.value).subscribe(reviews => {
//     this.reviews = reviews
//     console.log(this.reviews) 

//   })

// }

// }
// ... importaciones ...

// ... importaciones ...

@Component({
  selector: 'app-buscar-res',
  templateUrl: './buscar-res.component.html',
  styleUrls: ['./buscar-res.component.css']
})
export class BuscarResComponent implements OnInit {
  reviews: any[] = [];  // Define reviews como un array de tipo any
  items: MenuItem[] | undefined;
  constructor(
    private resServiceService: ResServiceService,
    private buscarResService: BuscarResService
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
    });
  }
  

  buscarReview(cityName: any): void {
    console.log(cityName);
    this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
      if (Array.isArray(reviews)) {
        this.reviews = reviews;
      } else {
        this.reviews = [reviews];
      }
      console.log(this.reviews);
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
    });
  }
}



