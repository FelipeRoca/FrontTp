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




  private fb = inject(FormBuilder);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  mailErrorModal : boolean = false;
  correctModal : boolean = false;
  

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
      
  showMailErrorModal() {
    const mailErrorModal = document.getElementById('mail-error-modal');
    if (mailErrorModal) {
      mailErrorModal.style.display = 'block';
    }
  }

  closeMailErrorModal() {
    const mailErrorModal = document.getElementById('mail-error-modal');
    if (mailErrorModal) {
      mailErrorModal.style.display = 'none';
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
      this.router.navigateByUrl('/iniciar-sesion');
    }
  }
  

  onFormSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

   

    const { password2, ...user } = this.myForm.value;

    this.authService.register(user)
      .subscribe({
        next: (res) => {
          this.correctModal = true;
          this.showCorrectModal();

        },
        error: (error) => {
          this.mailErrorModal = true;
          this.showMailErrorModal();
        }
      });
}


}



