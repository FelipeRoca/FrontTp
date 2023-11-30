


import { Component, OnInit, inject } from '@angular/core';
import { ResServiceService } from '../services/mis-res-service';
import { DelResServiceService } from '../services/del-res-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
 selector: 'app-mis-res',
 templateUrl: './mis-res.component.html',
 styleUrls: ['./mis-res.component.css']
})



export class MisResComponent implements OnInit{
review: any;
modalSwitch: boolean = false;
selectedReview: any;
selectedReviewIndex?: number;
  router: any;

 constructor(
    private delResService: DelResServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private route : Router
 ) {}

 ngOnInit(): void {
   let userId = this.authService.currentUser()!.id;

   this.resServiceService.getReviewsByUserId(userId).subscribe(reviews => {
   this.reviews = reviews
   console.log(this.reviews)
   })
 }

//  deleteReview(reviewId: number): void {
//     this.http.delete(`http://localhost:3001/reviews/${reviewId}`).subscribe(() => {
//       alert(`Review con ID ${reviewId} fue eliminada .`);
//       this.ngOnInit();
//     });
//  }

deleteReview(): void {
  if (this.selectedReview) {
    const reviewId = this.selectedReview.id;
    this.http.delete(`http://localhost:3001/reviews/${reviewId}`).subscribe(() => {
      alert(`Review con ID ${reviewId} fue eliminada.`);
      this.closeModal();
      this.reviews.splice(this.selectedReviewIndex, 1); // Elimina la revisión del arreglo local
    });
  }
}



 private resServiceService = inject(ResServiceService)

 public reviews?:any


 
 openModal(review: any, index: number) {
  this.selectedReview = review;
  this.selectedReviewIndex = index;
  this.modalSwitch = true;
}
 
 

closeModal() {
  this.modalSwitch = false;
}



navigateToModify(review:any) {
console.log(review)
localStorage.setItem('review',JSON.stringify(review))
   this.route.navigate([`/modify/:${review.id}`]);
}

}


