import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  public myForm!:UntypedFormGroup;
  popup = false;
  incorrectFiles:string[] = []
  incorrectFile = false;

  constructor(private formBuilder:UntypedFormBuilder, private jobOfferService:JoboffersService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {

    //Poti sa folosesti acel ma-select din angular materials ca sa pui skill-urile aici
    this.myForm = this.formBuilder.group({
      description:['',[Validators.required]],
      location:['',Validators.required],
      title : ['',[Validators.maxLength(25),Validators.required]],
      lowPriceRange: ['',Validators.required],
      highPriceRange:['',Validators.required],
      files:[]
    })

    this.onFormChanges();

  }

  reset(element:any) {
    element.value = "";
    this.myForm.patchValue({
      files : null
    });
    this.myForm.controls['files'].setErrors({'incorrectFile' : false});
    this.myForm.controls['files'].updateValueAndValidity();
    this.incorrectFile = false;
  }

  onFileSelect(event:any) {

    const files = (event.target as HTMLInputElement).files;

    if(files != undefined && files.length > 0){

      this.incorrectFile = false;
      try {
        this.myForm.patchValue({
          files : files
        });
      } catch (error) {
        console.log("Warning",error)
      }
  
      const permittedFormat:string[] = ['jpg','png', 'jpeg'];

      console.log('words:')
      for(let i = 0; i < files.length; i ++){
        
        let file = files.item(i);

        if(file?.name != undefined){
          const words = file?.name.split('.');
          console.log(words);
          if(words == undefined){
            this.incorrectFile = true;
            break;
          }
  
          if(!permittedFormat.includes(words[words.length-1].toLowerCase())){
            console.log('words[1] nu se gaseste in array:')
            console.log(words[1])
            this.incorrectFile = true;
            this.incorrectFiles.push(file?.name);
          }
        }


      }

      if(this.incorrectFile){
        console.log('setam eroare pe files')
        this.myForm.controls['files'].setErrors({'incorrectFile' : true});
      }else{
        console.log('stergem eroare de pe files')
        this.myForm.controls['files'].setErrors(null);
      }

      //https://stackoverflow.com/questions/43553544/how-can-i-manually-set-an-angular-form-field-as-invalid
      //VALIDARI PENTRU DIMENSIUNE
      // MESAJUL DE EROARE SA FIE MAI FRUMOS AFISAT si cu detalii..

    }


  }

  
  onFormChanges():void{

    const control1 = <UntypedFormControl>this.myForm.get('lowPriceRange');
    const control2 = <UntypedFormControl>this.myForm.get('highPriceRange');

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
    console.log("form inainte de trimitere")
    console.log(this.myForm)
    if(this.myForm.valid){
      var formData:any = new FormData();

      formData.append('description',this.myForm.get('description')?.value);
      formData.append('location',this.myForm.get('location')?.value);
      formData.append('title',this.myForm.get('title')?.value);
      formData.append('lowPriceRange',this.myForm.get('lowPriceRange')?.value);
      formData.append('highPriceRange',this.myForm.get('highPriceRange')?.value);

      var allFiles = this.myForm.get('files')?.value;

      //https://codeburst.io/uploading-multiple-files-with-angular-and-net-web-api-7560303d9345
      if(allFiles != null){
        for(let i = 0 ; i < allFiles.length; i ++){
          formData.append('files',allFiles[i]);
        }
        console.log('FormData files : ')
        console.log(formData.getAll('files'));
      }


      const observer = {
        next: (response:any) => {
          this.myForm.reset();
  
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
        },
        error: (error:any) => {
          console.log("AVEM EROARE!");
          console.log(error);
        }
      }

      this.jobOfferService.createJobOfferForm(formData).subscribe(observer)
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
