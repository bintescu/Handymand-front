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
  constructor(private contractsService: ContractsService,private router:Router) { }

  ngOnInit(): void {
  }

  getContracts(){
    this.contractsService.getContractsForHomePage().subscribe((response:any) => {
      this.contracts = response
      console.log(this.contracts);
    })
  }

  Hire(){
    var IdLoggedIn = localStorage.getItem('loggedInId');
    if(IdLoggedIn != null){
      this.router.navigate(['/hire']).then(() => {
        window.location.reload();
      });
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
    var IdLoggedIn = localStorage.getItem('loggedInId');
    if(IdLoggedIn != null){
      console.log('earn when LoggedIn!')
    }
    else{
      console.log('earn non-login!')
      this.popup = true;
      var homeElement = document.getElementById("allPage");
      if(homeElement != null){
        homeElement.style.overflowY = "hidden";
      }
    }
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
