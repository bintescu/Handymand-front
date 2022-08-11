import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  faclipboard = faCopy;
  public user: User = {
    id : 0,
    username : '',
    email : '',
    firstName :'',
    lastName : '',
    password: '',
    location: '',
    walletAddress:'',
    aboutMe : '',
    address:'',
    phone:'',
    title:'',
    role: -1,
    birthday: null,
    iv:null,
    amount:null
  }

  showAddress:boolean = false;
  age!:number;
  dateCreated!:Date;
  joiningDate!:string;
  birthdayString!:string;

  openedContracts:number = 0;
  closedContracts:number = 0;
  openedOffers:number = 0;
  openedJobOffers:number = 0;

  freelancerRating:number = 0;
  noFeedbacksFreelancer:number = 0;


  customerRating:number = 0;
  noFeedbacksCustomer:number = 0;

  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private userService:UserService,
     private clipboard: ClipboardService,
     private sanitizer:DomSanitizer,
     private offerService:OffersService) { }



    
  ngOnInit(): void {

    console.log(localStorage.getItem("name"));
    this.userService.getMyProfilePicture().subscribe((response:any) => {
      //var blob = new Blob([new Uint8Array(response.data)], { type: 'image' });
      // var blob = new Blob([response.data], { type: "image" });
      // let profileAddres:string = URL.createObjectURL(blob);
      // console.log(profileAddres)

      // let objectUrl = "data:image;base64," + response.data;
      // let safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      // this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      // console.log(this.profileImage)
      this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
      //this.profileImageElement.nativeElement.src = profileAddres;

    })

    
    const observer = {
      next: (rezult:any) => {
        this.user = rezult.data;

        this.getUserInfoBar();
        this.getRatingAsFreelancer();
        this.getRatingAsCustomer();
        this.user.birthday = new Date(Date.parse(rezult.data.birthday));
        if(this.user.birthday  != null){
          let year:number= Number(this.user.birthday.getFullYear());
          let today:number = Number(new Date().getFullYear());
          this.age = today - year;
          this.birthdayString = this.user.birthday.toLocaleDateString("en-US");
        }
        this.dateCreated = new Date(Date.parse(rezult.data.dateCreated));
        this.joiningDate = this.dateCreated.toLocaleDateString("en-US");
      },
      error : (err:any) => {
        console.log("eroare:")
        console.log(err);
      },
      complete: () => {
        console.log("complete!")
      }
    }

    this.userService.getMyuser().subscribe(observer)

  }


  copyWalletAdress(){
    var walletElem = document.getElementById("myWallet");
    if(walletElem != undefined){
      this.clipboard.copy(walletElem.innerHTML);
    }

  }


  getUserInfoBar(){

    if(this.user.id != null){
      const observer = {
        next : (res:any) => {
          this.openedContracts = res.data.openedContracts;
          this.closedContracts = res.data.closedContracts;
          this.openedOffers = res.data.openedOffers;
          this.openedJobOffers = res.data.openedJobOffers;
        },
        error: (err:any) => {
          console.log("error pe get info bar user");
          console.log(err);
        }
      }
  
      this.userService.getUserInfoBar(this.user.id).subscribe(observer);
    }

  }

  getRatingAsFreelancer(){
    const observer = {
      next: (resp:any) =>{
        console.log("rating as freelancer:")
        console.log(resp.data)
        this.freelancerRating = resp.data.grade;
        this.noFeedbacksFreelancer = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.user.id != null){
      this.offerService.getRatingForFreelancer(this.user.id).subscribe(observer);
    }

  }

  getRatingAsCustomer(){
    const observer = {
      next: (resp:any) =>{
        console.log("rating as customer:")
        console.log(resp.data)
        this.customerRating = resp.data.grade;
        this.noFeedbacksCustomer = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.user.id != null){
      this.offerService.getRatingForCustomer(this.user.id).subscribe(observer);
    }

  }
}
