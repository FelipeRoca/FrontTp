import { Component, inject } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/red-res-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-redactar',
  templateUrl: './redactar.component.html',
  styleUrls: ['./redactar.component.css']
})
export class RedactarComponent {
  
  ciudad!: string;
  review?: PostReview;
  
  //Inyecciones
  private fb = inject(FormBuilder);
  private reviewService = inject(ResServiceService);
  private router = inject(Router);
  private authService = inject(AuthService);

  //Reactive Form
  public myForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    description: ['', [Validators.required]], 
    stars: ['', [Validators.required]]   
  })


  //Metodos
  onFormSubmit() {
    
    if(this.myForm.invalid){
      alert("Complete todos los campos")  
      return;    
    }

    this.review = this.myForm.value

    if (this.authService.currentUser()) this.review!.userId = this.authService.currentUser()!.id;
    
    this.reviewService.postReviews(this.review!)
      .subscribe({
        next: (res) => {
          alert(`La review se cargo correctamente`);
          this.router.navigateByUrl('/inicio');
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  

}
