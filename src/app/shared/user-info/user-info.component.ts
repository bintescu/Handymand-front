import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { OffersService } from 'src/app/services/offers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() id:number|null = 0;
  @Input() firstName:string|null = "";
  @Input() lastName:string|null = "";
  @Input() title:string|null = "";
  @Input() aboutMe:string|null = "";
  ratingf:number = 0;
  totalnofeedbacksf:number = 0;

  ratingc:number = 0;
  totalnofeedbacksc:number = 0;
  @Output() acceptedOfferEvent = new EventEmitter<boolean>();

  @ViewChild('profileImage') profileImageElement!: ElementRef;

  
  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private keyEnv: string = environment.key;

  constructor(private offerService:OffersService,
              private authService:AuthService,
              private jobOfferService:JoboffersService,
              private router:Router) { }

  ngOnInit(): void {
    this.getProfilePictureUser();
    this.getRatingF();
    this.getRatingC();
  }


  getRatingF(){
    const observer = {
      next: (resp:any) =>{
        console.log("am primit rating pentru user:",this.firstName, this.lastName)
        console.log(resp)
        this.ratingf = resp.data.grade;
        this.totalnofeedbacksf = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.id){
      this.offerService.getRatingForFreelancer(this.id).subscribe(observer);
    }

  }

  getRatingC(){
    const observer = {
      next: (resp:any) =>{
        console.log("am primit rating pentru user:",this.firstName, this.lastName)
        console.log(resp)
        this.ratingc = resp.data.grade;
        this.totalnofeedbacksc = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.id){
      this.offerService.getRatingForCustomer(this.id).subscribe(observer);
    }

  }


  getProfilePictureUser(){
    if(this.id != null){
      let data = {
        "cryptId":this.authService.set(this.id.toString() ,this.keyEnv,this.IvEnv),
        "iv":this.authService.wordArrayToByteArray(this.IvEnv,16)
      }
  
      const observer = {
        next: (response:any) => {
          this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
        },
        error: (err:any) => {
          console.log("eroare pe get profile picture:")
        }
      }
      this.jobOfferService.getUserProfilePicture(data).subscribe(observer);
    }


  }

  showProfile(){
    if(this.id != null){
      var cryptedId = this.authService.set(this.id.toString(),this.keyEnv,this.IvEnv)
      var IvBase64 = CryptoJS.enc.Base64.stringify(this.IvEnv);
      this.router.navigate(['/profile'], { state: { cryptedId: cryptedId, IvBase64:IvBase64 } } );
    }


  }


}
