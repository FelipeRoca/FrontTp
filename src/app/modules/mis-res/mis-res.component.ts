
import { Component, OnInit } from '@angular/core';
import { ResServiceService } from '../services/mis-res-service';
import { DelResServiceService } from '../services/del-res-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

  items: MenuItem[] | undefined;

  constructor(
    private delResService: DelResServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private route: Router,
    private resServiceService: ResServiceService
  ) { }

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

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.sesion = true;
    }

    let userId = this.authService.currentUser()!.id;

    this.resServiceService.getReviewsByUserId(userId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  deleteReview(): void {
    if (this.selectedReview) {
      const reviewId = this.selectedReview.id;
      this.http.delete(`http://localhost:3001/reviews/${reviewId}`).subscribe(() => {
        this.closeModal();
        if (this.selectedReviewIndex !== undefined) {
          this.reviews.splice(this.selectedReviewIndex, 1); // Elimina la revisión del arreglo local
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
    localStorage.setItem('review', JSON.stringify(review));
    this.route.navigate([`/modify/:${review.id}`]);
  }
}
