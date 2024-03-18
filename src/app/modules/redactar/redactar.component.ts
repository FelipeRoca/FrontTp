
// import { Component, inject } from '@angular/core';
// import { PostReview } from '../interfaces/review.interface';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ResServiceService } from '../services/red-res-service';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { MenuItem } from 'primeng/api';


// @Component({
//   selector: 'app-redactar',
//   templateUrl: './redactar.component.html',
//   styleUrls: ['./redactar.component.css']
// })
// export class RedactarComponent {
//   items: MenuItem[] | undefined;
//   ciudad!: string;
//   review?: PostReview;
//   sesion: boolean = false;

//   // Inyecciones
//   private fb = inject(FormBuilder);
//   private reviewService = inject(ResServiceService);
//   private router = inject(Router);
//   private authService = inject(AuthService);

//   // Reactive Form
//   public myForm: FormGroup = this.fb.group({
//     country: ['', [Validators.required]],
//     city: ['', [Validators.required]],
//     description: ['', [Validators.required]],
//     stars: ['', [Validators.required]]
//   })

//   ngOnInit(){
//     this.items = [
//       {
//           label: 'Inicio',
//           routerLink: ['/inicio'],
//           icon: 'pi pi-fw pi-file',
//           items: [] 
//       },
//       {
//           label: 'Iniciar Sesion',
//           routerLink: ['/iniciar-sesion'],
//           icon: 'pi pi-fw pi-user',
//           items: []
//       },
//       {
//           label: 'Registrarse',
//           routerLink: ['/registrarse'],
//           icon: 'pi pi-fw pi-calendar',
//           items: []
//       },
//   ];

//   const currentUser = this.authService.currentUser();
// if (!currentUser) {
//   this.sesion = true;
// }
//   }

//   // Métodos
//   onFormSubmit() {


//     if (this.myForm.invalid) {
//       showCompleteModal() {
//         const modal = document.getElementById('completeModal');
//         if (modal) {
//           modal.style.display = "block";
//         }
//       }
//       return;
//     }
//     // Verifica si currentUser es nulo
//     const currentUser = this.authService.currentUser();
//     if (!currentUser) {
//       return;
//     }


//     this.review = this.myForm.value;
//     // Asigna el userId solo si currentUser no es nulo
//     this.review!.userId = currentUser.id;

//     this.reviewService.postReviews(this.review!)
//       .subscribe({
//         next: (res) => {
//           alert(`La review se cargó correctamente`);
//           this.router.navigateByUrl('/inicio');
//         },
//         error: (error) => {
//           alert(`La review NO se cargó correctamente`);

//           console.log(error);
//         }
//       });
//   }
// }




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
      modal.style.display = "block";
    }
  }
  closeModal() {
    const modal = document.getElementById('completeModal');
    if (modal) {
      modal.style.display = "none";
    }
  }

  showCorrectModal() {
    const CorrectModal = document.getElementById('correctModal');
    if (CorrectModal) {
      CorrectModal.style.display = "block";
    }
  }
  closeCorrectModal() {
    const CorrectModal = document.getElementById('correctModal');
    if (CorrectModal) {
      CorrectModal.style.display = "none";
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

    this.review = this.myForm.value;
    this.review!.userId = currentUser.id;

    this.reviewService.postReviews(this.review!)
      .subscribe({
        next: (res) => {
          this.showCorrectModal();
        },
        error: (error) => {
          alert(`La review NO se cargó correctamente`);
          console.log(error);
        }
      });
  }
}
