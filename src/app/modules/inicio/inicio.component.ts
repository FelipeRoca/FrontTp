import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private authService: AuthService) {}
  items: MenuItem[] | undefined;


  ngOnInit(): void{
    const user = this.authService!.currentUser();
    console.log('User:', user);
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
          routerLink: ['/registrarse'],
          icon: 'pi pi-fw pi-calendar',
          items: []
      },
  ];
  
  }

}
