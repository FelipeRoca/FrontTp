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
  
  }

}

