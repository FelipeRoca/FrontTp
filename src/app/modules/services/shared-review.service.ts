import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedReviewService {
  private review: any = null;

  setReview(review: any) {
    this.review = review;
  }

  getReview() {
    return this.review;
  }

  clearReview() {
    this.review = null;
  }
}
