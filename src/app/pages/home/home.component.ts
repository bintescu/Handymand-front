import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { Contract } from 'src/app/interfaces/contract';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faStickyNote = faStickyNote;
  public contracts?: Contract[];
  popup = false;
  scroll = true;
  token: string | null | undefined;
  constructor(private contractsService: ContractsService,private router:Router) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
  }


  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  getContracts(){
    this.contractsService.getContractsForHomePage().subscribe((response:any) => {
      this.contracts = response
      console.log(this.contracts);
    })
  }

  Hire(){
    if(this.token != null && this.token != undefined){
      var IdLoggedIn = this.parseJwt(this.token).id;

      if(IdLoggedIn != null){
        this.router.navigate(['/hire']).then(() => {;
        });
      }
    }
    else{
      const element = <HTMLElement> document.getElementsByClassName('overlay')[0];
      if(element != null){
        console.log(element);
        element.style.opacity = "100%";
        element.style.zIndex = "2"
      }
      var homeElement = document.getElementById("allPage");
      if(homeElement != null){
        homeElement.style.overflowY = "hidden";
      }


    }
  }

  EarnMoney(){
    this.router.navigate(['joboffers']);
  }

  EnableScroll(){
    var homeElement = document.getElementById("allPage");
    if(homeElement != null){
      homeElement.style.overflowY = "auto";
    }
  }

  closePopup(){
    const element = <HTMLElement> document.getElementsByClassName('overlay')[0];
    if(element != null){
      console.log(element);
      element.style.visibility = "hidden";
      element.style.opacity = "0%";
      element.style.zIndex = "-1"
      element.style.visibility = "visible";
    }
    this.EnableScroll();
    
  }

}
