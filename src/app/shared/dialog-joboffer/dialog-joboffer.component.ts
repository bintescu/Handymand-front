import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { AuthService } from 'src/app/services/auth.service';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-joboffer',
  templateUrl: './dialog-joboffer.component.html',
  styleUrls: ['./dialog-joboffer.component.scss']
})
export class DialogJobofferComponent implements OnInit, AfterViewInit {


  active:boolean = true;
  active2:boolean = false;
  active3:boolean = false;

  description:string = "";
  title:string = "";
  creationName:string = ""
  id:number|null = null;
  images:any[] = [];

  noImages:number[] |null = null;


  slideIndex:number = 1;
  @ViewChild('profileImage') profileImageElement!: ElementRef;

  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private keyEnv: string = environment.key;

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef: MatDialogRef<DialogJobofferComponent>, 
  private authService:AuthService, 
  private jobOfferService:JoboffersService,
  public sanitizer:DomSanitizer,
  private router:Router) {
   }
  
  ngAfterViewInit(): void {

    this.showDivs(1);
  }


  
  ngOnInit(): void {
    if(this.editData != null){
      this.title = this.editData.Title;
      this.description = this.editData.Description;
      this.creationName = this.editData.CreationName;
      this.id = this.editData.IdJobOffer;
      if(this.editData.NoImages != null){
        this.noImages = [];
        for(let i = 1 ; i < this.editData.NoImages + 1; i ++){
          this.noImages.push(i);
        }
      }
      this.getProfilePictureUser();
      this.getJobOfferImages();
    }

  }

  viewJob(){
    this.close();
    this.router.navigate(['/jobofferpage/' + this.id]);
  }

  getJobOfferImages(){

    if(this.noImages && this.id != null)
    for(let  index = 1; index < this.noImages?.length + 1; index++){
      const observer = {
        next: (response:any) => {

          let pictureAddress:string = URL.createObjectURL(response);
          var element = <HTMLInputElement> document.getElementById("slideImage" + index)
          if(element != null){
            element.src = pictureAddress;
          }
          
        },
        error: (err:any) =>{
          console.log('Error pe get job offer images!');
          console.log(err);
        }
        
      }
  
      
      this.jobOfferService.getImages(this.id,index).subscribe(observer);
      
    }


  }
  getProfilePictureUser(){
    let data = {
      "cryptId":this.authService.set(this.editData.CreationId.toString() ,this.keyEnv,this.IvEnv),
      "iv":this.authService.wordArrayToByteArray(this.IvEnv,16)
    }

    const observer = {
      next: (response:any) => {
        this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
      },
      error: (err:any) => {
        console.log("eroare pe get profile picture:")
        console.log(err)
      }
    }
    this.jobOfferService.getUserProfilePicture(data).subscribe(observer);

  }

// Next/previous controls
  plusSlide(n:number) {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n:number){
    var i;
    var x = Array.from(document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>);
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex-1].style.display = "block"; 
  }


  close(){
    this.dialogRef.close("close");
  }
}
