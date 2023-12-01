
// import { Component, inject } from '@angular/core';
// import { PostReview } from '../interfaces/review.interface';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ResServiceService } from '../services/modify-rev.service';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-modify-review',
//   templateUrl: './modify-review.component.html',
//   styleUrls: ['./modify-review.component.css']
// })

// export class ModifyReviewComponent {

//   ciudad!: string;
//   review: any;
//   reviewId? : any;

//   constructor(
//     private fb: FormBuilder,
//     private reviewService: ResServiceService,
//     private router: Router,
//     private authService: AuthService,
//     private route: ActivatedRoute // Agrega ActivatedRoute
//   ) {}

//   // Reactive Form
//   public myForm: FormGroup = this.fb.group({
//     country: ['', [Validators.required]],
//     city: ['', [Validators.required]],
//     description: ['', [Validators.required]],
//     stars: ['', [Validators.required]]
//   })

//   // Métodos
//   ngOnInit(): void {
//     this.review=localStorage.getItem('review')
//     this.review=JSON.parse(this.review)

//     this.myForm.setValue({
//       country: this.review.country,
//       city: this.review.city,
//       description: this.review.description,
//       stars: this.review.stars
//     });
//   }
      


// onFormSubmit() {
//   if (this.myForm.invalid) {
//     alert("Complete todos los campos");
//     return;
//   }

//   // Verifica si currentUser es nulo
//   const currentUser = this.authService.currentUser();
//   if (!currentUser) {
//     alert("Debe iniciar sesión para modificar una reseña");
//     return;
//   }

//   this.review.description = this.myForm.value.description;
//   this.review.country = this.myForm.value.country;
//   this.review.city = this.myForm.value.city;
//   this.review.stars = this.myForm.value.stars;
  

//   console.log(this.review)

//   this.reviewService.putReviews(this.review).subscribe({
//       next: (res) => {
//         alert(`La review se cargó correctamente`);
//         this.router.navigateByUrl('/inicio');
//       },
//       error: (error) => {
//         if (error.status === 401) {
//           alert("No autorizado para modificar la reseña.");
//         } else {
//           console.log(error);
//           alert("Ocurrió un error al cargar la reseña.");
//         }
//       }
//     });
// }

// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/modify-rev.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
    private router: Router
  ) {
    this.myForm = this.fb.group({
      // country: ['', Validators.required],
      // city: ['', Validators.required],
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

    // Obtén la revisión de localStorage
    const storedReview = localStorage.getItem('review');
    if (storedReview) {
      this.review = JSON.parse(storedReview);
      // Inicializa el formulario con los valores de la revisión
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

    // Actualiza los valores de la revisión con los del formulario
    this.review = { ...this.review, ...this.myForm.value };

    this.reviewService.putReviews(this.review).subscribe({
      next: (res) => {
        alert('La revisión se modificó correctamente');
        this.router.navigateByUrl('/mis-res');
      },
      error: (error) => {
        console.error(error);
        alert('Ocurrió un error al modificar la revisión.');
      }
    });
  }
}
