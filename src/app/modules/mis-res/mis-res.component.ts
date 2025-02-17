import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { ResServiceService } from '../services/mis-res-service';
import { DelResServiceService } from '../services/del-res-service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service'; 
import { SharedReviewService } from '../services/shared-review.service';

@Component({
  selector: 'app-mis-res',
  templateUrl: './mis-res.component.html',
  styleUrls: ['./mis-res.component.css']
})
export class MisResComponent implements OnInit {
  reviews: any;
  modalSwitch: boolean = false;
  sesion: boolean = false;
  selectedReview: any;
  selectedReviewIndex?: number;
  noReviews: boolean = false;  

  items: MenuItem[] | undefined;

  constructor(
    private delResService: DelResServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private route: Router,
    private resServiceService: ResServiceService,
    private localStorageService: LocalStorageService,
    private sharedReviewService: SharedReviewService,
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.sesion = true;
    }

    let userId = this.authService.currentUser()!.id;

    this.resServiceService.getReviewsByUserId(userId).subscribe(reviews => {
      this.reviews = reviews;
      
      if (this.reviews.length === 0) {
        this.noReviews = true;  
        setTimeout(() => {
          this.route.navigate(['/inicio']);  
        }, 3000);
      }
    });
  }

  deleteReview(): void {
    if (this.selectedReview) {
      const reviewId = this.selectedReview.id;
      this.http.delete(`http://localhost:3001/reviews/${reviewId}`).subscribe(() => {
        this.closeModal();
        if (this.selectedReviewIndex !== undefined) {
          this.reviews.splice(this.selectedReviewIndex, 1); 
        }
      });
    }
  }

  openModal(review: any, index: number): void {
    this.selectedReview = review;
    this.selectedReviewIndex = index;
    this.modalSwitch = true;
  }

  closeModal(): void {
    this.modalSwitch = false;
  }

  navigateToModify(review: any): void {
    this.sharedReviewService.setReview(review); 
    this.route.navigate(['/modify', review.id]);
  }
}
