import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PostUser } from '../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResServiceService } from '../services/signup-re.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent {

    user?: PostUser;
  
    //Inyecciones
    private fb = inject(FormBuilder);
    private reviewService = inject(ResServiceService);
    private router = inject(Router);
  
    //Reactive Form
    public myForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        name: ['', [Validators.required]],
      });
      
  
  items: MenuItem[] | undefined;

ngOnInit() {
        this.items = [
            {
                label: 'Home',
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
      //Metodos
//   onFormSubmit() {
    
//     if(this.myForm.invalid){
//       alert("Complete todos los campos")  
//       return;    
//     }

//     this.user = this.myForm.value
    
//     this.reviewService.postUsers(this.user!)
//       .subscribe({
//         next: (res) => {
//           alert(`El usuario se cargo correctamente`);
//           this.router.navigateByUrl('/inicio');
//         },
//         error: (error) => {
//           console.log(error);
//         }
//       });
//   }



// ...

onFormSubmit() {
  if (this.myForm.invalid) {
    alert("Complete todos los campos");
    return;
  }

  this.user = this.myForm.value;

  this.reviewService.postUsers(this.user!)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        alert(`El usuario se cargó correctamente`);
        this.router.navigateByUrl('/inicio');
      },
      error: (error) => {
        console.log('Error al cargar el usuario:', error);
        alert('Error al cargar el usuario. Consulta la consola para más detalles.');
      }
    });
}

}




