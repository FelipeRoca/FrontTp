import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/inicio' },
    { label: 'Iniciar Sesión', icon: 'pi pi-fw pi-user', routerLink: '/iniciar-sesion' },
    { label: 'Registrarse', icon: 'pi pi-fw pi-user-plus', routerLink: '/registrarse' },
    { 
      label: 'Reseñas', 
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Crear Reseña', icon: 'pi pi-fw pi-align-left', routerLink: '/redactar' },
        { label: 'Ver Mis Reseñas', icon: 'pi pi-fw pi-list', routerLink: '/mis-res' },
        { label: 'Ver Todas', icon: 'pi pi-fw pi-search', routerLink: '/buscar' }
      ]
    }
  ];

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}
