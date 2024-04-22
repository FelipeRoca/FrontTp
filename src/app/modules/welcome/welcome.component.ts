import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  items: MenuItem[] | undefined;

   ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-file',
                routerLink: '/inicio',
                items: [] 
            },
            {
              icon: 'pi pi-fw pi-pencil',
              label: 'Reseñas',
                items: [
                    {
                        label: 'Crear Reseña',
                        icon: 'pi pi-fw pi-align-left',
                        routerLink: '/redactar'
                    },
                    {
                        label: 'Ver mis Reseñas',
                        icon: 'pi pi-fw pi-align-center',
                        routerLink: '/mis-res'
                    },
                    {
                        label: 'Ver todas las Reseñas',
                        icon: 'pi pi-fw pi-align-center',
                        routerLink: '/buscar'
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
                routerLink: ['/registrarse'],
                icon: 'pi pi-fw pi-calendar',
                items: []
            },

        ];
    }
}
