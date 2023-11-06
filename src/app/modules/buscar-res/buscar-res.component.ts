import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/res-service.service';

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

  public reviews?:any


}


