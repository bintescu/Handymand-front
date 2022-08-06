import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public id:string = '';

  private cryptedId:string | null = null;
  private Iv:CryptoJS.lib.WordArray| null = null;
  private keyEnv: string = environment.key;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {


    if(this.Iv != null && this.cryptedId != null){
      localStorage.setItem('storedcryptedId',this.cryptedId);

      var base64Iv = CryptoJS.enc.Base64.stringify(this.Iv);
      localStorage.setItem('storedBase64Iv',base64Iv);
    }


    return true;

  }
  
  constructor(private activatedRoute:ActivatedRoute, private authService:AuthService, private userService:UserService) { 
  }

  ngOnInit(): void {
    // console.log('avem user id in userservice:');
    // this.activatedRoute.params.subscribe((params:any) =>{
    //   console.log(params);
    //   this.id = params['id'];
    // });


    console.log("cryptedId :",this.cryptedId)
    console.log("Iv",this.Iv)
    if(this.cryptedId == null && this.Iv == null)
    {
      console.log("ambele sunt null..")
      var cryptedIdLocal = localStorage.getItem("storedcryptedId");
      var base64IvLocal = localStorage.getItem("storedBase64Iv");

      console.log("ce am luat de pe ls: ",cryptedIdLocal, " ", base64IvLocal);

      //Venim din refresh
      if(cryptedIdLocal != null && base64IvLocal != null){
        console.log("deci ele sunt diferite de null si le stergem din local..")

        localStorage.removeItem("storedcryptedId");
        localStorage.removeItem("storedBase64Iv");
  
        this.Iv =  CryptoJS.enc.Base64.parse(base64IvLocal);
        this.cryptedId = cryptedIdLocal;

        console.log("am setat this.cryptedId:",this.cryptedId, " this.iv: ", this.Iv);
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
          },
          error: (err:any)=>{
            console.log("Error pe get user:")
            console.log(err)
          }
          
        }
  
        this.userService.getUser(data).subscribe(observer);
      }


    }

  }

}
