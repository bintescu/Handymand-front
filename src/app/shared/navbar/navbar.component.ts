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
import { FaLayersCounterComponent } from '@fortawesome/angular-fontawesome';
import { SignalrService } from 'src/app/services/signalr.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  counterNotifications:number =  0;
  counterNotificationActiveOffers:number = 0;
  counterNotificationsActiveJobOffers:number = 0;
  counterNotificationsMyAcceptedJobOffers:number = 0;
  counterNotificationsMyClosedJobOffers:number = 0;


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
    private dialog:MatDialog,
    public notificationService: NotificationService) { 
    }


  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  ngOnInit(): void {
    this.notificationService.connect();

    this.notificationService.notifications.subscribe((data: boolean) => {
      this.initNotificationLists();
    });


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

      this.initNotificationLists();
    }

  }




  initNotificationLists(){
    this.getActiveOffers();
    this.getAcceptedOffers();
    this.getActiveJobOffers();
    this.getPendingJobOffers();
    this.getAllClosedJobOffersForFeedback();

    this.getTotalNumberOfNotifications();
  }

  getTotalNumberOfNotifications(){

    const observer = {
      next: (resp:any) => {
        this.counterNotifications = resp.data;
      },
      error: (err:any) =>{
        console.log("Error when get total number of notifications");
        console.log(err);
      }
    }
    
    this.userService.getTotalNrOfNotifications().subscribe(observer);

  }


  getActiveOffers(){
    
    const observer = {
      next: (res:any) => {

        this.counterNotificationActiveOffers = 0;
        this.offersList = res.data;
        this.offersList.forEach((offer:OfferItem) => {
          if(offer.viewed == false){
            this.counterNotificationActiveOffers += offer.notViewedNotifications;
          }
        })

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

        this.counterNotificationsMyAcceptedJobOffers = 0;
        this.acceptedOffersList = res.data;
        this.acceptedOffersList.forEach((offer:OfferItem) => {
          if(offer.viewed == false){
            this.counterNotificationsMyAcceptedJobOffers += offer.notViewedNotifications;
          }
        })
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
        this.counterNotificationsMyClosedJobOffers = 0;

        this.closedJobOfferList.forEach((jobOffer:JobOfferItem) => {
          if(jobOffer.viewed == false){
            this.counterNotificationsMyClosedJobOffers += jobOffer.notViewedNotifications;
          }
        })

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

        this.counterNotificationsActiveJobOffers = 0;
        this.jobOffersList = res.data;
        this.jobOffersList.forEach((jobOffer:JobOfferItem) => {
          if(jobOffer.viewed == false){
            this.counterNotificationsActiveJobOffers += jobOffer.notViewedNotifications;
          }
        })

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

    this.userService.viewNotification(offer.id,3).subscribe((res:any) => {
      this.initNotificationLists();
    });


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


  GoToJobOfferAndViewNotificationCreateOffer(offer:OfferItem){

    
    this.userService.viewNotification(offer.jobOfferId,1).subscribe((res:any) => {
      this.initNotificationLists();
      this.router.navigate(['/jobofferpage/'+offer.jobOfferId])
    });

  }

  GoToJobOfferAndViewNotificationCreateOfferJB(jobOffer:JobOfferItem){

    
    this.userService.viewNotification(jobOffer.id,1).subscribe((res:any) => {
      this.initNotificationLists();
      this.router.navigate(['/jobofferpage/'+jobOffer.id])
    });

  }

  GoToJobOfferAndViewNotificationMyAcceptedOffers(offer:OfferItem){
    this.userService.viewNotification(offer.jobOfferId,2).subscribe((res:any) => {
      this.initNotificationLists();
      this.router.navigate(['/jobofferpage/'+offer.jobOfferId])
    });
  }

}

class OfferItem{
  id!: number;
  dateCreated!: Date;
  jobOfferId!: number;
  jobOfferTitle!: string;
  paymentAmount!:number;
  viewed!:boolean;
  notViewedNotifications!:number;

}

class JobOfferItem{
  id!: number;
  dateCreated!: Date;
  title!: string;
  creationUserId:number = 0;
  creationUserName:string|null = null;
  viewed!:boolean;
  notViewedNotifications!:number;
}
