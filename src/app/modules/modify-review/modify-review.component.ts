import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/modify-rev.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedReviewService } from '../services/shared-review.service';

@Component({
  selector: 'app-modify-review',
  templateUrl: './modify-review.component.html',
  styleUrls: ['./modify-review.component.css']
})
export class ModifyReviewComponent implements OnInit {
  review: any;
  myForm: FormGroup;
  items: MenuItem[] | undefined;

  constructor(
    private fb: FormBuilder,
    private reviewService: ResServiceService,
    private router: Router,
    private sharedReviewService: SharedReviewService
  ) {
    this.myForm = this.fb.group({
      description: ['', Validators.required],
      stars: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      this.review = this.sharedReviewService.getReview();

    if (this.review) {
     this.myForm.patchValue(this.review);
     } else {
     console.error('No se encontró ninguna reseña.');
    }
  }

  onFormSubmit() {
    if (this.myForm.invalid) {
      alert('Complete todos los campos');
      return;
    }

    this.review = { ...this.review, ...this.myForm.value };

    this.reviewService.putReviews(this.review).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/mis-res');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
