import { Component, ElementRef, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { OffersService } from 'src/app/services/offers.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.scss']
})
export class OfferInfoComponent implements OnInit {

  @Input() creationUserName:string = "";
  @Input() creationUserTitle:string = "";
  @Input() creationUserId:number|null = null;
  @Input() paymentAmount:number|null = null;
  @Input() description:string = "";
  @Input() creationUserAge:number|null = null;
  @Input() isCreationUserLoggedIn:boolean = false;
  @Input() available:boolean = false;
  @Input() dateCreated:Date = new Date();
  @Input() jobOfferId:string|null = null;
  @Input() id:number = 0;
  @Input() showGreen:boolean = true;
  rating:number = 0;
  totalnofeedbacks:number = 0;

  @Output() acceptedOfferEvent = new EventEmitter<boolean>();

  @ViewChild('profileImage') profileImageElement!: ElementRef;

  
  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private keyEnv: string = environment.key;
  

  handShake = faHandshake;
  faStar = faStarRegular;
  faStarHalf = faStarHalfAlt;
  constructor(private authService:AuthService, 
    private router:Router,
    private jobOfferService:JoboffersService,
    private offerSerivce:OffersService) { }

  ngOnInit(): void {
    this.getProfilePictureUser();
    this.getRating();
  }

  userProfile(){

    if(this.creationUserId != null){
      var cryptedId = this.authService.set(this.creationUserId.toString(),this.keyEnv,this.IvEnv)
      var IvBase64 = CryptoJS.enc.Base64.stringify(this.IvEnv);
      this.router.navigate(['/profile'], { state: { cryptedId: cryptedId, IvBase64:IvBase64 } } );
    }

  }

  getRating(){
    const observer = {
      next: (resp:any) =>{
        this.rating = resp.data.grade;
        this.totalnofeedbacks = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.creationUserId){
      this.offerSerivce.getRatingForFreelancer(this.creationUserId).subscribe(observer);
    }

  }

  getProfilePictureUser(){
    if(this.creationUserId != null){
      let data = {
        "cryptId":this.authService.set(this.creationUserId.toString() ,this.keyEnv,this.IvEnv),
        "iv":this.authService.wordArrayToByteArray(this.IvEnv,16)
      }
  
      const observer = {
        next: (response:any) => {
          this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
        },
        error: (err:any) => {
          console.log("eroare pe get profile picture:")
          console.log(err)
        }
      }
      this.jobOfferService.getUserProfilePicture(data).subscribe(observer);
    }


  }

  acceptOffer(){

    if(this.jobOfferId != null){
      const acceptOfferObserver = {
        next: (res:any) => {
          console.log("res:")
          console.log(res)
          this.acceptedOfferEvent.emit(true);
        },
        error: (err:any) => {
          console.log("Eroare pe accept offer!")
          console.log(err);
        }
      }
  
      let data = {
        "JobOfferId" : parseInt(this.jobOfferId),
        "OfferId" : this.id
      }

      this.offerSerivce.acceptOffer(data).subscribe(acceptOfferObserver);
    }

  }
}

enum iconClass {
  faStarRegular = 0,
  faStarHalfAlt = 2 ,
  faStarSolid = 1 
}

