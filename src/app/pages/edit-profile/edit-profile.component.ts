import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

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
    amount: null
  }

  age!:number;
  dateCreated!:Date;
  joiningDate!:string;
  birthdayString!:string;
  birthdayPlaceHolder!:string;
  public updateForm!:UntypedFormGroup;
  incorrectFiles:string[] = []
  incorrectFile = false;
  selectedFile!: File;


  openedContracts:number = 0;
  closedContracts:number = 0;
  openedOffers:number = 0;
  openedJobOffers:number = 0;



  freelancerRating:number = 0;
  noFeedbacksFreelancer:number = 0;


  customerRating:number = 0;
  noFeedbacksCustomer:number = 0;


  @ViewChild("profileImage") profileImage!: ElementRef;

  constructor(private formBuilder:UntypedFormBuilder,
    private userService:UserService, 
    private clipboard:ClipboardService, 
    private router:Router,
    private offerService:OffersService) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  
  ngOnInit(): void {

    this.userService.getMyProfilePicture().subscribe((response:any) => {
      this.profileImage.nativeElement.src = "data:image;base64," + response.data;
    })

    this.updateForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.pattern('[- +()0-9]+')]],
      address:[''],
      birthday :['',[Validators.required]],
      aboutMe:[''],
      title:['']
    })

    this.userService.getMyuser().subscribe((rezult:any) => {
      this.user = rezult.data;

      this.getUserInfoBar();
      this.getRatingAsCustomer();
      this.getRatingAsFreelancer();
      this.user.birthday = new Date(Date.parse(rezult.data.birthday));
      if(this.user.birthday  != null){
        let year:number= Number(this.user.birthday.getFullYear());
        let today:number = Number(new Date().getFullYear());
        this.age = today - year;
        this.birthdayString = this.user.birthday.toLocaleDateString("en-US");
        this.birthdayPlaceHolder = this.formatDate(this.user.birthday); 
      }
      this.dateCreated = new Date(Date.parse(rezult.data.dateCreated));
      this.joiningDate = this.dateCreated.toLocaleDateString("en-US");

      this.updateForm.patchValue({"email":this.user.email});
      this.updateForm.patchValue({"phone":this.user.phone});
      this.updateForm.patchValue({"address":this.user.address});
      this.updateForm.patchValue({"birthday":this.birthdayPlaceHolder});
      this.updateForm.patchValue({"aboutMe":this.user.aboutMe});
      this.updateForm.patchValue({"title":this.user.title});

    });


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


  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  copyWalletAdress(){
    var walletElem = document.getElementById("myWallet");
    if(walletElem != undefined){
      this.clipboard.copy(walletElem.innerHTML);
    }
  }


  doUpdate(){
    const observer = {
      next: (response:any) =>{
        this.router.navigate(['/myprofile']).then(() => {

                  // this.updateForm.patchValue({"email":response.data.email});
        // this.updateForm.patchValue({"phone":response.data.phone});
        // this.updateForm.patchValue({"address":response.data.address});
        // this.user.birthday = new Date(Date.parse(response.data.birthday));
        // this.birthdayPlaceHolder = this.formatDate(this.user.birthday); 
        // this.updateForm.patchValue({"birthday":this.birthdayPlaceHolder});

        })},
      error: (e:any) => {console.log("eroarea este:");
                        console.log(e)},
      complete: () => console.log('Observer got a complete notification'),
    }

    if(this.updateForm.dirty && this.updateForm.valid){
        var formData:FormData = new FormData();
        formData.append('email',this.updateForm.get('email')?.value);
        formData.append('phone',this.updateForm.get('phone')?.value);
        formData.append('address',this.updateForm.get('address')?.value);
        formData.append('birthday',this.updateForm.get('birthday')?.value);
        formData.append('aboutMe',this.updateForm.get('aboutMe')?.value);
        formData.append('title',this.updateForm.get('title')?.value);
        if(this.selectedFile != undefined){
          formData.append('profilePicture',this.selectedFile,this.selectedFile.name);
        }

      this.userService.updateMyUser(formData).subscribe(observer)
    }
    else{
      this.router.navigate(['/myprofile'])
    }

  }

  onFileSelect(event:any) {
    console.log('a intrat aici!')

    const files = (event.target as HTMLInputElement).files;

    if(files != null)
    {
      let file:File = files[0];
      this.incorrectFile = false;

      const permittedFormat:string[] = ['jpg','png', 'jpeg'];

      const words = file.name.split('.');

      console.log('file dupa split:')
      console.log(words);
      if(words == undefined){
        this.incorrectFile = true;
      }

      if(!permittedFormat.includes(words[words.length-1].toLowerCase()))
      {
        console.log('words[1] nu se gaseste in array:')
        console.log(words[1])
        this.incorrectFile = true;
      }

      if(this.incorrectFile)
      {
        console.log('setam eroare pe files')
        this.updateForm.setErrors({'incorrectFile':true});

        const element = document.getElementById('failedPopup');
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
      }else{
        console.log('stergem eroare de pe files')
        this.updateForm.setErrors(null);
        this.updateForm.markAsDirty();

        this.profileImage.nativeElement.src = URL.createObjectURL(file);
        this.selectedFile = file;
        console.log('am pus pe selectedFile : ');
        console.log(this.selectedFile);
        // try{
        //   this.updateForm.patchValue({
        //     profilePicture : file
        //   })
        // }
        // catch(error){
        //   console.log("error setare profile picture:",error);
        // }
      }
    }
  }


  closePopup(){
    const element = document.getElementById('failedPopup');
        if(element != null){
          element.style.visibility = "hidden";
          element.style.visibility = "0%";
          element.style.zIndex = "-1";
          element.style.marginTop = "5%"
          element.style.visibility = "visible";
        }
  }
}
