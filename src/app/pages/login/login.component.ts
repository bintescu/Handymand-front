import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
    email :'',
    password: '',
    firstName: '',
    lastName: ''
  }

  public error:boolean | string = false;
  validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.text = "Hello World!2";
  }


  doLogin():void{
    this.error = false;
    console.log("LOGIN CLICKED!",this.user);
    if(this.validateEmail(this.user.email)){
      this.authService.login(this.user).subscribe((response:any) => {
        console.log(response)
        if(response && response.token){
          localStorage.setItem('token',response.token);
          console.log("last name si firstname:");
          console.log(response.lastName + " " + response.firstName);
          localStorage.setItem('name',response.lastName + " " + response.firstName)
          this.router.navigate(['/dashboard']);
        }
      })
      console.log("Am apelat serviciul de login!")
    }else{
      this.error = "Email is not valid";
    }

  }

  ngOnChanges(){

  }

  ngOnDestroy(){

  }

}
