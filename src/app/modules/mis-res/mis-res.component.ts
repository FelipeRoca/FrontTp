// import { Component, OnInit, inject } from '@angular/core';
// import { ResServiceService } from '../services/mis-res-service';
// import { DelResServiceService } from '../services/del-res-service';

// @Component({
//  selector: 'app-mis-res',
//  templateUrl: './mis-res.component.html',
//  styleUrls: ['./mis-res.component.css']
// })

// export class MisResComponent implements OnInit{
// review: any;
//  ngOnInit(): void {
//     this.resServiceService.getReviewsByUserId(1).subscribe(reviews => {
//       this.reviews = reviews
//       console.log(this.reviews)
//     })
//  }

//  private resServiceService = inject(ResServiceService)

//  public reviews?:any
// }



import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/mis-res-service';
import { DelResServiceService } from '../services/del-res-service';
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'app-mis-res',
 templateUrl: './mis-res.component.html',
 styleUrls: ['./mis-res.component.css']
})

export class MisResComponent implements OnInit{
review: any;

 constructor(
    private delResService: DelResServiceService,
    private http: HttpClient
 ) {}

 ngOnInit(): void {
    this.resServiceService.getReviewsByUserId(1).subscribe(reviews => {
      this.reviews = reviews
      console.log(this.reviews)
    })
 }

 deleteReview(reviewId: number): void {
    this.http.delete(`http://localhost:3001/reviews/${reviewId}`).subscribe(() => {
      console.log(`Review con ID ${reviewId} fue eliminada .`);
      this.ngOnInit();
    });
 }

 private resServiceService = inject(ResServiceService)

 public reviews?:any
}
