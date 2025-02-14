import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../modules/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] = [];
  private router = inject(Router);
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setMenuItems(); // Inicializa los ítems del menú al cargar
  }

  setMenuItems() {
    if (this.authService.isAuthenticated()) {
      // Si el usuario está logueado
      this.items = [
        { label: 'Inicio', icon: 'pi pi-home', routerLink: '/inicio' },
        { label: 'Mis Reseñas', icon: 'pi pi-calendar', routerLink: '/mis-res' },
        { label: 'Crear reseñas', icon: 'pi pi-home', routerLink: '/redactar' },
        { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
      ];
    } else {
      // Si el usuario no está logueado
      this.items = [
        { label: 'Inicio', icon: 'pi pi-home', routerLink: '/inicio' },
        { label: 'Iniciar Sesión', icon: 'pi pi-user', routerLink: '/iniciar-sesion' },
        { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/registrarse' }
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/inicio')
    this.setMenuItems(); // Actualizar los ítems del menú después de hacer logout
  }
}
