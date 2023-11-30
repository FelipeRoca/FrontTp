import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../services/validators.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// esto se agrego
  // loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    email: ['1111@gmail.com', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], []],
    password: ['1111', [Validators.required], []],
  });

  public show = signal<boolean>(false);
  public password = signal('password');

  onSubmit(): void {
    if (this.myForm.invalid) {
      console.log(this.myForm.errors);
      console.log("test");
      return;
    };

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/inicio')
      });
  }
//hasta aca

  onShow(): void {
    if (!this.show()) this.password.set('text');
    else this.password.set('password');

    return this.show.set(!this.show());
  }

  /* Barra de navegacion */

  items: MenuItem[] | undefined;

   ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                routerLink: ['/inicio'],
                icon: 'pi pi-fw pi-file',
                items: [] 
            },
            {
              icon: 'pi pi-fw pi-pencil',
              disabled: true,
              label: 'Reseñas',
                items: [
                    {
                        label: 'Crear Reseña',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Leer Reseñas',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Eliminar Reseña',
                        icon: 'pi pi-fw pi-align-center'
                    },
                ]
            },
            {
                label: 'Iniciar Sesion',
                routerLink: ['.'],
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
    }

}

