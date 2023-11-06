import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/mis-res-service';

@Component({
 selector: 'app-mis-res',
 templateUrl: './mis-res.component.html',
 styleUrls: ['./mis-res.component.css']
})

export class MisResComponent implements OnInit{
review: any;
 ngOnInit(): void {
    this.resServiceService.getReviewsByUserId(1).subscribe(reviews => {
      this.reviews = reviews
      console.log(this.reviews)
    })
 }

 private resServiceService = inject(ResServiceService)

 public reviews?:any
}