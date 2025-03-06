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
    const videos = document.querySelectorAll<HTMLVideoElement>('.background-video');
      videos.forEach(video => {
        setTimeout(() => {
          video.muted = true;
          video.play().catch(error => {
            console.log('Autoplay bloqueado, esperando interacción del usuario:', error);
      });
    }, 800);
});

  }
  
  
}

