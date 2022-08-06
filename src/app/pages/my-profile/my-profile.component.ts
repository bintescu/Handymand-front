import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  age!:number;
  dateCreated!:Date;
  joiningDate!:string;
  birthdayString!:string;

  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private userService:UserService,
     private clipboard: ClipboardService,
     private sanitizer:DomSanitizer) { }


     @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
      localStorage.setItem("name","ss");
      event.returnValue = false;
    }

    
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
}
