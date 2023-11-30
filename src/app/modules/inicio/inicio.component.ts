import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void{
    const user = this.authService!.currentUser();
    console.log('User:', user);
  }

}
