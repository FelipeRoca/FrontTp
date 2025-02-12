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

    }
}
