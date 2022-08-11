import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {


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


  navigationObserver:any ={
    next: (res:NavigationStart) =>{
      localStorage.removeItem("storedcryptedId");
      localStorage.removeItem("storedBase64Iv");
    },
    error: (err:any) => {
      console.log("error when routing detected");
      console.log(err);
    }
  }

  faclipboard = faCopy;

  public id:string = '';

  private cryptedId:string | null = null;
  private Iv:CryptoJS.lib.WordArray| null = null;
  private keyEnv: string = environment.key;

  @ViewChild('profileImage') profileImageElement!: ElementRef;

  
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {

    if(this.Iv != null && this.cryptedId != null){
      localStorage.setItem('storedcryptedId',this.cryptedId);

      var base64Iv = CryptoJS.enc.Base64.stringify(this.Iv);
      localStorage.setItem('storedBase64Iv',base64Iv);
    }

    return true;

  }
  
  constructor(private activatedRoute:ActivatedRoute, 
              private authService:AuthService,
              private clipboard: ClipboardService, 
              private userService:UserService,
              private router:Router,
              private offerService:OffersService) { 

      
      //router.events.subscribe(this.navigationObserver);
  }
  ngOnDestroy(): void {
    localStorage.removeItem("storedcryptedId");
    localStorage.removeItem("storedBase64Iv");
  }

  ngOnInit(): void {
    if(this.cryptedId == null && this.Iv == null)
    {
      var cryptedIdLocal = localStorage.getItem("storedcryptedId");
      var base64IvLocal = localStorage.getItem("storedBase64Iv");

      //Venim din refresh
      if(cryptedIdLocal != null && base64IvLocal != null){

        localStorage.removeItem("storedcryptedId");
        localStorage.removeItem("storedBase64Iv");
  
        this.Iv =  CryptoJS.enc.Base64.parse(base64IvLocal);
        this.cryptedId = cryptedIdLocal;
      }
      //Venim cu history
      else if(history.state.IvBase64 != undefined && history.state.cryptedId != undefined){
        this.cryptedId = history.state.cryptedId;
        this.Iv = CryptoJS.enc.Base64.parse(history.state.IvBase64);
      }

      //Nu venim nici din history nici din refresh.


      //Trimitem la server
      if(this.Iv != null){
        let data = {
          "cryptId":this.cryptedId,
          "iv":this.authService.wordArrayToByteArray(this.Iv,16)
        }
  
        const observer = {
          next: (result:any) =>{
            console.log(result)
            this.user = result.data;
            this.user.birthday = new Date(Date.parse(result.data.birthday));

            this.getUserInfoBar();
            this.getRatingAsFreelancer();
            this.getRatingAsCustomer();
            if(this.user.birthday  != null){
              let year:number= Number(this.user.birthday.getFullYear());
              let today:number = Number(new Date().getFullYear());
              this.age = today - year;
              this.birthdayString = this.user.birthday.toLocaleDateString("en-US");
            }
            this.dateCreated = new Date(Date.parse(result.data.dateCreated));
            this.joiningDate = this.dateCreated.toLocaleDateString("en-US");
          },
          error: (err:any)=>{
            console.log("Error pe get user:")
            console.log(err)
          }
          
        }
  
        this.userService.getUser(data).subscribe(observer);
      }

      this.getProfilePictureUser();
    }

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

  getProfilePictureUser(){
    if(this.Iv != null){
      let data = {
        "cryptId":this.cryptedId,
        "iv":this.authService.wordArrayToByteArray(this.Iv,16)
      }

      const observer = {
        next: (response:any) => {
          this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
        },
        error: (err:any) => {
          console.log(err)
        }
      }
      this.userService.getUserProfilePicture(data).subscribe(observer);
    }



  }

}
