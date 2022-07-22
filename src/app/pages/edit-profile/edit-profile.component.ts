import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    birthday: null
  }

  age!:number;
  dateCreated!:Date;
  joiningDate!:string;
  birthdayString!:string;
  birthdayPlaceHolder!:string;
  public updateForm!:FormGroup;
  incorrectFiles:string[] = []
  incorrectFile = false;
  selectedFile!: File;

  @ViewChild("profileImage") profileImage!: ElementRef;

  constructor(private formBuilder:FormBuilder,private userService:UserService, private clipboard:ClipboardService, private router:Router) { }


  ngOnInit(): void {

    this.userService.getMyProfilePicture().subscribe((response:any) => {
      console.log('Am primit de la server cand am apelat picture profile:')
      console.log(response.data);
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
