import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   mostrarClave() {
    const passwordInput = document.getElementById('exampleInputPassword1') as HTMLInputElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  /* Barra de navegacion */

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


