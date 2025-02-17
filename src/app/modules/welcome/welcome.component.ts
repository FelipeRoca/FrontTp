import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarComponent } from 'src/app/components/menubar/menubar.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  items: MenuItem[] | undefined;

  ngOnInit() {
    const video = document.querySelector('.background-video') as HTMLVideoElement;   //Para que se reproduzca el video apenas carga la pagina
    if (video) {
      setTimeout(() => {
        video.muted = true; 
        video.play().catch(error => {
          console.log('Autoplay bloqueado, esperando interacción del usuario:', error);
        });
      }, 800);
    }
  }
  
  
}
