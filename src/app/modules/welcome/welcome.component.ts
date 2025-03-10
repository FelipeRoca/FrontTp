import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
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

