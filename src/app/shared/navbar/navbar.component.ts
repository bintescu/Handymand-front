import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { OffersService } from 'src/app/services/offers.service';
import { PageEvent } from '@angular/material/paginator';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCloseContractComponent } from '../dialog-close-contract/dialog-close-contract.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loginName?: string ;
  faUserCircle = faUserCircle;
  public loginId?: string;
  public adminMode?:boolean = false;
  faBell = faBell;
  id:number = 0;

  offersList:OfferItem[] = [];
  jobOffersList:JobOfferItem[] = [];
  closedJobOfferList:JobOfferItem[] = [];
  acceptedOffersList:OfferItem[] = [];
  pendingJobs:JobOfferItem[] = [];

  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private router:Router, 
    private userService:UserService, 
    private offersService:OffersService, 
    private jobOffersService:JoboffersService,
    private dialog:MatDialog) { }


  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  ngOnInit(): void {

    const observer = {
      next: (response:any) => {
        this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
      },
      error: (err:any) => {
        //console.log("This user doesn`t have profile image!");
      }
    }
    if(localStorage.getItem('name') != null){
      this.userService.getMyProfilePicture().subscribe(observer)
      var name = localStorage.getItem('name');
      if(name !== null){
        this.loginName = name;
      }

      var token = localStorage.getItem('token');
      if(token != null){
        var role = this.parseJwt(token).role;

        if(role == 0){
          this.adminMode = true;
        }

        this.id = this.parseJwt(token).id;
      }

      this.getPendingOffers();
      this.getActiveJobOffers();
      this.getAcceptedOffers();
      this.getPendingJobOffers();
      this.getAllClosedJobOffersForFeedback();
    }

  }

  getPendingOffers(){
    
    const observer = {
      next: (res:any) => {

        this.offersList = res.data;
      },
      error: (err:any) => {
        console.log("Eroare pe get lista de oferte pentru logged in!");
        console.log(err);
      }
    }

    this.offersService.getAllForLoggedIn().subscribe(observer);
  }

  getAcceptedOffers(){
    
    const observer = {
      next: (res:any) => {

        this.acceptedOffersList = res.data;
      },
      error: (err:any) => {
        console.log("Eroare pe get lista de oferte acceptate pentru logged in!");
        console.log(err);
      }
    }

    this.offersService.getAllAcceptedForLoggedIn().subscribe(observer);
  }


  getAllClosedJobOffersForFeedback(){
    const observer = {
      next: (res:any) => {

        this.closedJobOfferList = res.data;
        console.log("closedJobOfferList :")
        console.log(this.closedJobOfferList)
      },
      error: (err:any) => {
        console.log("Eroare pe get lista de closed job offers pentru feedback!");
        console.log(err);
      }
    }

    this.jobOffersService.getAllClosedJobOfferForFeedback().subscribe(observer);
  }

  getActiveJobOffers(){
    
    const observer = {
      next: (res:any) => {

        this.jobOffersList = res.data;
      },
      error: (err:any) => {
        console.log("Eroare pe get lista de job offers pentru logged in!");
        console.log(err);
      }
    }

    this.jobOffersService.getAllForLoggedIn().subscribe(observer);
  }

  getPendingJobOffers(){
    
    const observer = {
      next: (res:any) => {

        this.pendingJobs = res.data;
      },
      error: (err:any) => {
        console.log("Eroare pe get lista de job offers pentru logged in!");
        console.log(err);
      }
    }

    this.jobOffersService.getAllPendingForLoggedIn().subscribe(observer);
  }

  signOut(): void{
    localStorage.clear();
    console.log('signed out!')
  }

  goToProfile(): void{
    this.router.navigate(['/profile/'+this.loginId])
  }
  
  myProfile():void{
    this.router.navigate(['myprofile'])
  }

  showFeedbackDialog(offer:JobOfferItem){
    const sentData = {
      "IdJobOffer" : offer.id,
      "FromClient" : false,
      "FromFreelancer": true,
      "UserName":offer.creationUserName

    }

    const dialogRef = this.dialog.open(DialogCloseContractComponent, {
      width:'30%',
      data:sentData,
      }).afterClosed().subscribe((val:any) => {
        if(val === 'sent'){
          this.getAllClosedJobOffersForFeedback();
        }
      });;
  }

}

class OfferItem{
  id!: number;
  dateCreated!: Date;
  jobOfferId!: number;
  jobOfferTitle!: string;
  paymentAmount!:number;

}

class JobOfferItem{
  id!: number;
  dateCreated!: Date;
  title!: string;
  creationUserId:number = 0;
  creationUserName:string|null = null
}
