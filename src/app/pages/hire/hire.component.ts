import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss'],
  animations: [
    // animation triggers go here
  ]
})
export class HireComponent implements OnInit {

  faStar = faStar;
  public myForm!:FormGroup;
  popup = false;

  constructor(private formBuilder:FormBuilder, private jobOfferService:JoboffersService) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      description:['',[Validators.required]],
      location:['',Validators.required],
      title : ['',[Validators.maxLength(25),Validators.required]],
      lowPriceRange: ['',Validators.required],
      highPriceRange:['',Validators.required]
    })

    this.onFormChanges();

  }

  onFormChanges():void{

    const control1 = <FormControl>this.myForm.get('lowPriceRange');
    const control2 = <FormControl>this.myForm.get('highPriceRange');

    control2.valueChanges.subscribe((value: number) => {
      if (value < control1.value) {
        control2.setValidators([Validators.min(control1.value),Validators.required])
      }
    })

    control1.valueChanges.subscribe((value: number) => {
      if (value > control2.value) {
        control2.setValidators([Validators.min(control1.value),Validators.required])
      }

      control2.updateValueAndValidity();
    })
  }


  createJobOffer(){
    console.log(this.myForm)
    if(this.myForm.valid){
      this.myForm.value.idCreationUser = localStorage.getItem("loggedInId");
      this.jobOfferService.createJobOffer(this.myForm.value).subscribe((response:any) => {
        console.log("job offer created!");
        this.myForm.reset();
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


      },
      (error:any) => {
        console.log("AVEM EROARE!");
      }
      )
    }
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
