
import { Component, inject } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/modify-rev.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-review',
  templateUrl: './modify-review.component.html',
  styleUrls: ['./modify-review.component.css']
})

export class ModifyReviewComponent {

  ciudad!: string;
  review: any;
  reviewId? : any;

  constructor(
    private fb: FormBuilder,
    private reviewService: ResServiceService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute // Agrega ActivatedRoute
  ) {}

  // Reactive Form
  public myForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: ['', [Validators.required]]
  })

  // Métodos
  ngOnInit(): void {
    this.review=localStorage.getItem('review')
    this.review=JSON.parse(this.review)
  }
      


onFormSubmit() {
  if (this.myForm.invalid) {
    alert("Complete todos los campos");
    return;
  }

  // Verifica si currentUser es nulo
  const currentUser = this.authService.currentUser();
  if (!currentUser) {
    alert("Debe iniciar sesión para modificar una reseña");
    return;
  }

  this.review.description = this.myForm.value.description;
  this.review.country = this.myForm.value.country;
  this.review.city = this.myForm.value.city;
  this.review.stars = this.myForm.value.stars;
  

  console.log(this.review)

  this.reviewService.putReviews(this.review).subscribe({
      next: (res) => {
        alert(`La review se cargó correctamente`);
        this.router.navigateByUrl('/inicio');
      },
      error: (error) => {
        if (error.status === 401) {
          alert("No autorizado para modificar la reseña.");
        } else {
          console.log(error);
          alert("Ocurrió un error al cargar la reseña.");
        }
      }
    });
}

}
