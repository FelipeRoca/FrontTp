
import { Component, inject } from '@angular/core';
import { PostReview } from '../interfaces/review.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/red-res-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-redactar',
  templateUrl: './redactar.component.html',
  styleUrls: ['./redactar.component.css']
})
export class RedactarComponent {
  items: MenuItem[] | undefined;
  ciudad!: string;
  review?: PostReview;
  sesion: boolean = false;

  // Inyecciones
  private fb = inject(FormBuilder);
  private reviewService = inject(ResServiceService);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Reactive Form
  public myForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: ['', [Validators.required]]
  })

  ngOnInit(){
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

  // Métodos
  onFormSubmit() {
    if (this.myForm.invalid) {
      alert("Complete todos los campos");
      return;
    }

    // Verifica si currentUser es nulo
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      alert("Debe iniciar sesión para realizar una reseña");
      this.router.navigateByUrl('/iniciar-sesion');
      return;
    }

    this.review = this.myForm.value;

    // Asigna el userId solo si currentUser no es nulo
    this.review!.userId = currentUser.id;

    this.reviewService.postReviews(this.review!)
      .subscribe({
        next: (res) => {
          alert(`La review se cargó correctamente`);
          this.router.navigateByUrl('/inicio');
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
