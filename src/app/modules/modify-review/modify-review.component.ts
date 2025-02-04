import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/modify-rev.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../services/local-storage.service'; 

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
    private localStorageService: LocalStorageService 
  ) {
    this.myForm = this.fb.group({
      description: ['', Validators.required],
      stars: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        routerLink: ['/inicio'],
        icon: 'pi pi-fw pi-file',
        items: [] 
      },
      {
        label: 'Iniciar Sesion',
        routerLink: ['/iniciar-sesion'],
        icon: 'pi pi-fw pi-user',
        items: []
      },
      {
        label: 'Registrarse',
        routerLink: ['/registrarse'],
        icon: 'pi pi-fw pi-calendar',
        items: []
      },
    ];

  
    const storedReview = this.localStorageService.getItem('review');
    if (storedReview) {
      this.review = storedReview;
      this.myForm.patchValue(this.review);
    } else {
      console.error('No se encontró ninguna revisión en localStorage.');
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









