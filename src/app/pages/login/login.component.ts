import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges, OnDestroy {

  public text:string = "";

  public isDisabled:boolean = false;

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
    birthday: new Date()
  }

  public email:string = '';
  public password:string = '';

  public error:boolean | string = false;

  @ViewChild("countdown")
  myDiv!: ElementRef;

  @ViewChild("loginButton") loginButton!:any;
  
  validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }
  }


  doLogin():void{
    this.error = false;
    let data = {
      "email":this.email,
      "password":this.password
    }
    if(this.validateEmail(this.email)){
      try{

        const observer = {
          next: (response: any) => 
            {
              localStorage.setItem('token',response.data.token);
              localStorage.setItem('name',response.data.lastName + ' ' + response.data.firstName)
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            },
          error: (err:any) =>{
              this.loginButton.nativeElement.disabled = true;
              //Afiseaza fereastra de succes
              const element = document.getElementById('succesPopup');
              if(element != null){
                element.style.opacity = "100%";
                element.style.zIndex = "10";
                element.style.marginTop = "20%"
                setTimeout( () => {
                  element.style.visibility = "0%";
                  element.style.zIndex = "-1";
                  element.style.marginTop = "5%"
                }, 3000);
              }
              var timeleft = 15;
              var downloadTimer = setInterval(() =>{
                  if(timeleft <= 0){
                    clearInterval(downloadTimer);
                    this.myDiv.nativeElement.innerHTML = null;
                    this.loginButton.nativeElement.disabled = false;
                  } else {
                    this.myDiv.nativeElement.innerHTML = "(" +timeleft +")";
                  }
                  timeleft -= 1;
              }, 1000);
        },
          complete: () => console.log('Observer got a complete notification'),
        }
        this.authService.login(data).subscribe(observer);
        // this.authService.login(data).subscribe((response:any) => {
        //   if(response && response.data.token){
        //     localStorage.setItem('token',response.data.token);
        //     localStorage.setItem('name',response.data.lastName + ' ' + response.data.firstName)
        //     this.router.navigate(['/home']).then(() => {
        //       window.location.reload();
        //     });
        //   }
        // })
      }
      catch(e){
        console.log("Exceptia :")
        console.log(e);
      }

    }else{
      this.error = "Email is not valid!";
    }

  }

  ngOnChanges(){

  }

  ngOnDestroy(){

  }

  closePopup(){
    const element = document.getElementById('succesPopup');
        if(element != null){
          element.style.visibility = "hidden";
          element.style.visibility = "0%";
          element.style.zIndex = "-1";
          element.style.marginTop = "5%"
          element.style.visibility = "visible";
        }
  }

}
