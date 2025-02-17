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
  public loginErrorModal: boolean = false;  

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/inicio');
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      return;
    }

    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/inicio');
      },
      error: () => {
        this.loginErrorModal = true;  
      }
    });
  }


  closeModal(): void {
    this.loginErrorModal = false;
  }

  onShow(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }
}

