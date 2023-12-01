import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../interfaces/user.interface';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ResServiceService } from '../services/signup-re.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidatorsService } from '../services/validators.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent {

  // user?: User;

  //Inyecciones
  private fb = inject(FormBuilder);
  // private reviewService = inject(ResServiceService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  
  //Reactive Form
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    name: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]
  });
    
  
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
            label: 'Iniciar Sesion',
            routerLink: ['/iniciar-sesion'],
            icon: 'pi pi-fw pi-user',
            items: []
        },
        {
            label: 'Registrarse',
            routerLink: ['.'],
            icon: 'pi pi-fw pi-calendar',
            items: []
        },
    ];
  }
      

  onFormSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // this.user = this.myForm.value;
    const { password2, ...user } = this.myForm.value;

    this.authService.register(user)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/iniciar-sesion');
        },
        error: (error) => {
          console.log('Error al cargar el usuario:', error);
          alert('Error al cargar el usuario. Consulta la consola para más detalles.');
        }
      });


  }

  
}




