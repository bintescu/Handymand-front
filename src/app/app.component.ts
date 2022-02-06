import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Handymand';
  faCoffee = faCoffee;
}
