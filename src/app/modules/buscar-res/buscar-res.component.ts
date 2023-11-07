import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';
import { BuscarResService } from '../services/buscar-res.service';


@Component({
  selector: 'app-buscar-res',
  templateUrl: './buscar-res.component.html',
  styleUrls: ['./buscar-res.component.css']
})
export class BuscarResComponent implements OnInit{
  ngOnInit(): void {
    this.resServiceService.getReviews().subscribe(reviews => {
      this.reviews = reviews
      console.log(this.reviews)
    })
  }

  private resServiceService = inject(ResServiceService)
  private buscarResService = inject(BuscarResService)


  public reviews:any=[]

  buscarReview(cityName: any): void {
    console.log(cityName)
    this.buscarResService.getReviewsByCityName(cityName.value).subscribe(reviews => {
      this.reviews = reviews
      console.log(this.reviews) 

    })
}

mostrarInput(valor: any){
  this.buscarResService.getReviewsByCityName(valor.value).subscribe(reviews => {
    this.reviews = reviews
    console.log(this.reviews) 

  })

}

}


