import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent {

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

}
