import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public myForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      firstName:['',[Validators.required]],
      lastName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
  }

  doRegister(){
    console.log(this.myForm)
    if(this.myForm.valid){
      //call api register cu datele din this.myForm.value
      this.authService.register(this.myForm.value).subscribe((response:any) => {
        this.router.navigate(['/login']);
      })
    }
  }

}
