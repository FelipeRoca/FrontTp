import { Component, inject } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/red-res-service';
import { Router } from '@angular/router';


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
    this.review!.userId= "1"
    
    this.reviewService.postReviews(this.review!)
      .subscribe({
        next: (res) => {
          alert(`La review se cargo correctamente`);
          this.router.navigateByUrl('/mis-res');
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  

}
