
// import { Component, OnInit, inject, signal } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MenuItem } from 'primeng/api';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { ValidatorsService } from '../services/validators.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   private fb = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);
//   private validatorsService = inject(ValidatorsService);

//   public myForm: FormGroup = this.fb.group({
//     email: ['1111@gmail.com', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], []],
//     password: ['1111', [Validators.required], []],
//   });

//   public items: MenuItem[] = [];

//   public show = signal<boolean>(false);
//   public passwordVisible: boolean = false;

//   ngOnInit() {
//   }

//   onSubmit(): void {
//     if (this.myForm.invalid) {
//       console.log(this.myForm.errors);
//       console.log("test");
//       return;
//     };

//     const { email, password } = this.myForm.value;

//     this.authService.login(email, password)
//       .subscribe({
//         next: () => this.router.navigateByUrl('/inicio')
//       });
//   }

//   onShow(): void {
//     this.passwordVisible = !this.passwordVisible;
//   }

//   getPasswordType(): string {
//     return this.passwordVisible ? 'text' : 'password';
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    email: ['1111@gmail.com', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['1111', [Validators.required]],
  });

  public passwordVisible: boolean = false;

  ngOnInit() {
    // Si el usuario ya está logueado, redirigirlo al inicio
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/inicio');
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      console.log(this.myForm.errors);
      return;
    }

    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/inicio'); // Redirigir al inicio después de loguearse
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      }
    });
  }

  onShow(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }
}
