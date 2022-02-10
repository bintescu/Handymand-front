import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loginName?: string ;
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit(): void {
    var name = localStorage.getItem('name');
    if(name !== null){
      this.loginName = name;
    }
  }

}
