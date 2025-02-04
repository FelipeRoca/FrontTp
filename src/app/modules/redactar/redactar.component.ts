import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostReview } from '../interfaces/review.interface';
import { ResServiceService } from '../services/red-res-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-redactar',
  templateUrl: './redactar.component.html',
  styleUrls: ['./redactar.component.css']
})
export class RedactarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sesion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: ResServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  public myForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: ['', [Validators.required]]
  });

  ngOnInit() {
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

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.sesion = true;
    }
  }

  showCompleteModal() {
    const modal = document.getElementById('completeModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('completeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  showCorrectModal() {
    const correctModal = document.getElementById('correctModal');
    if (correctModal) {
      correctModal.style.display = 'block';
    }
  }

  closeCorrectModal() {
    const correctModal = document.getElementById('correctModal');
    if (correctModal) {
      correctModal.style.display = 'none';
      this.router.navigateByUrl('/inicio');
    }
  }

  onFormSubmit() {
    if (this.myForm.invalid) {
      this.showCompleteModal();
      return;
    }

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      return;
    }

    const reviewData = this.myForm.value;
    const review: PostReview = {
      userId: currentUser.id,
      country: reviewData.country,
      city: reviewData.city,
      description: reviewData.description,
      stars: reviewData.stars
    };

    this.reviewService.postReviews(review).subscribe({
      next: () => {
        this.showCorrectModal();
      },
      error: (error) => {
        console.error('Error al guardar la review:', error);
      }
    });
  }
}
