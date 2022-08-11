import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from 'src/app/interfaces/job-offer';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Skill } from 'src/app/interfaces/skill';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { PageEvent } from '@angular/material/paginator';
import { Offer } from 'src/app/interfaces/offer';
import { DialogCloseContractComponent } from 'src/app/shared/dialog-close-contract/dialog-close-contract.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss']
})
export class JobOfferPageComponent implements OnInit {

  faImage = faImage;

  id!: string | null;
  firstName:string = "";
  location:string = "";
  jobOffer!: JobOffer;
  offerForm !: UntypedFormGroup;
  selectedSort:number = 0;
  skills:string[]|null = [];
  jobOfferAvailable:boolean = true;

  pageSize = 3;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 6, 9, 12];
  previousPageIndex: number | undefined;

  noOfItems:number = 3;

  offers!:Offer[];

  rating!:number;
  totalnofeedbacks!:number;

  @ViewChild('profileImage') profileImageElement!: ElementRef;
 
  isCreationUserLoggedIn:boolean = false;
  
  noImages:number[] |null = null;

  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private keyEnv: string = environment.key;

  
  constructor(private route: ActivatedRoute ,
     private jobOfferService: JoboffersService,
      private router:Router,
      private authService:AuthService,
      private formBuilder: UntypedFormBuilder,
      private offersService: OffersService,
      private dialog:MatDialog) { }

  get jobOfferTitle(){
    return (this.jobOffer && this.jobOffer.title) ? this.jobOffer.title : null;
  }

  get jobOfferDescription(){
    return (this.jobOffer && this.jobOffer.description) ? this.jobOffer.description : null;
  }

  get jobOfferLowPrice(){
    return (this.jobOffer && this.jobOffer.lowPriceRange) ? this.jobOffer.lowPriceRange : null;
  }

  get jobOfferHighPrice(){
    return (this.jobOffer && this.jobOffer.highPriceRange) ? this.jobOffer.highPriceRange : null;
  }

  get jobOfferLocation(){
    return (this.jobOffer && this.jobOffer.location) ? this.jobOffer.location : null;
  }

  get jobOfferCreationName(){
    return (this.jobOffer && this.jobOffer.firstName && this.jobOffer.lastName) ? this.jobOffer.lastName + " " + this.jobOffer.firstName : null;
  }

  get jobOfferEmail(){
    return (this.jobOffer && this.jobOffer.email ) ? this.jobOffer.email + " " : null;
  }
  
  get jobOfferSkills(){
    return (this.jobOffer && this.jobOffer.skills) ? this.jobOffer.skills : null;
  }

  get jobOfferCity(){
    return (this.jobOffer && this.jobOffer.city)? this.jobOffer.city.name : null;
  }


  userProfile(){

    var cryptedId = this.authService.set(this.jobOffer.idCreationUser.toString(),this.keyEnv,this.IvEnv)
    var IvBase64 = CryptoJS.enc.Base64.stringify(this.IvEnv);
    this.router.navigate(['/profile'], { state: { cryptedId: cryptedId, IvBase64:IvBase64 } } );
  }

  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  ngOnInit(): void {

    this.offerForm = this.formBuilder.group({
      paymentAmount : ['',Validators.required],
      description:['',Validators.required],
      jobOfferId:0
    })



    this.id = this.route.snapshot.paramMap.get('id')


    if(this.id != null){

      const setTotal = {
        next : (res:any) => {
          this.noOfItems = res.data;
        },
        error: (err:any) => {
          console.log("error when get total nr of offers.");
          console.log(err);
        }
      }

      this.offersService.getTotalNoOffers(parseInt(this.id)).subscribe(setTotal);
      this.getJobOffer();

      this.getOffers();

    }



  }


  getRating(){
    const observer = {
      next: (resp:any) =>{
        console.log("penttru creator ratingul este:")
        console.log(resp.data)
        this.rating = resp.data.grade;
        this.totalnofeedbacks = resp.data.nrOfFeedbacks;
      },
      error: (err:any) =>{
        console.log("Error pe get rating");
        console.log(err);
      }
    }

    if(this.jobOffer.idCreationUser){
      this.offersService.getRatingForCustomer(this.jobOffer.idCreationUser).subscribe(observer);
    }

  }


  getJobOffer(){

    if(this.id != null){

      const observer = {
        next: (response:any) => {
            this.jobOffer = response.data;
            this.jobOfferAvailable = this.jobOffer.available;
      
            console.log("am setat jobOfferAvailable:",this.jobOfferAvailable)
            if(this.jobOffer.noImages != null){
              this.noImages = [];
              for(let i = 1 ; i < this.jobOffer.noImages + 1; i ++){
                this.noImages.push(i);
              }
            }
      
            if(this.jobOffer.skills){
              this.jobOffer.skills.forEach((skill:Skill) => {
                this.skills?.push(skill.skillName);
              })
      
            }
      
            this.getJobOfferImages();
            this.getProfilePictureUser();
            this.getRating();
      
            let loggedInId:number = this.parseJwt(localStorage.getItem('token')).id;
      
            if(loggedInId == this.jobOffer.idCreationUser){
              this.isCreationUserLoggedIn  = true;
            }
        },
        error: (err:any) => {
          console.log("Error when get job offer!");
          console.log(err);
          if(err.status == 404){
            this.router.navigate(['/jobclosed'] );
          }
          if(err.status == 410){
            this.router.navigate(["/notfound"])
          }
        }
      }



      this.jobOfferService.getSpecificJobOffer(parseInt(this.id)).subscribe(observer)
    }


  }


  acceptEvent(event:any){
    this.getJobOffer();
    this.getOffers();
  }

  getOffers(){

    if(this.id != null){
      const observer = {
        next : (res:any) => {

  
          this.offers = res.data;
          var today = new Date();
          this.offers?.forEach((element, index) => {
            var creationDate = new Date(element.dateCreated);
            element.daysAgo = parseInt(((today.getTime() - creationDate.getTime())/ (1000 * 3600 * 24)).toFixed());
          })
  
        },
        error: (err:any) => {
          console.log("Eroare pe get reviews:")
          console.log(err);
        }
      }
  
  
      this.offersService.getAllOffersForJobOffer(parseInt(this.id),this.currentPage,this.pageSize,this.selectedSort).subscribe(observer);
    }

  }

  changeSort(event:any){
    this.selectedSort = event.target.value;
    this.getOffers();
  }

  submitOffer(){
    this.offerForm.controls['jobOfferId'].setValue(this.id);

    const observer = {
      next: (res:any) =>{
        this.offerForm.reset();

        //Afiseaza fereastra de succes

        const element = document.getElementById('succesPopup');

        const title = document.getElementById('popupTitle');
        if(title != null){
          title.innerHTML = "Well done!"
        }
        const message = document.getElementById('popupMessage');
        if(message != null){
          message.innerHTML = "You successfully created an offer!"
        }


        if(element != null){
          element.className = "alert alert-success";
          element.style.opacity = "100%";
          element.style.zIndex = "10";
          element.style.marginTop = "20%"
          setTimeout( () => {
            element.style.visibility = "0%";
            element.style.zIndex = "-1";
            element.style.marginTop = "5%"
          }, 3000);
        }

        this.getOffers();


      },
      error: (err:any) => {
        //Afiseaza fereastra de succes

        const element = document.getElementById('succesPopup');

        const title = document.getElementById('popupTitle');
        if(title != null){
          title.innerHTML = "Error!"
        }
        const message = document.getElementById('popupMessage');
        if(message != null){
          message.innerHTML = err.error.message;
        }


        if(element != null){
          element.className = "alert alert-danger";
          element.style.opacity = "100%";
          element.style.zIndex = "10";
          element.style.marginTop = "20%"
          setTimeout( () => {
            element.style.visibility = "0%";
            element.style.zIndex = "-1";
            element.style.marginTop = "5%"
          }, 3000);
        }
      }


    }

    this.offersService.createOffer(this.offerForm.value).subscribe(observer);
    //Mai trebuie sa facem un getAllOffers()
  }

  getProfilePictureUser(){

    let data = {
      "cryptId":this.authService.set(this.jobOffer.idCreationUser.toString(),this.keyEnv,this.IvEnv),
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



  changeImage(element:any) {
    var main_prodcut_image = <HTMLImageElement> document.getElementById('main_product_image');
    main_prodcut_image.src = element.target.src;
    
  }


  getJobOfferImages(){
  if(this.noImages && this.id != null)
  {
    for(let  index = 1; index < this.noImages?.length + 1; index++){
      const observer = {
        next: (response:any) => {

          let pictureAddress:string = URL.createObjectURL(response);

          if(index == 1){
            
            var element = <HTMLInputElement> document.getElementById("main_product_image")
            if(element != null){
              element.src = pictureAddress;
            }
          }
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

      
      this.jobOfferService.getImages(this.jobOffer.idJobOffer,index).subscribe(observer);
      
    }
}


  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex;
    this.getOffers();
  }
  

  closeContract(){
    const sentData = {
      "IdJobOffer" : this.id,
      "FromClient" : true,
      "FromFreelancer": false,
      "UserName":this.jobOfferCreationName

    }

    const dialogRef = this.dialog.open(DialogCloseContractComponent, {
      width:'30%',
      data:sentData,
      });

  }

  deleteJobOffer(){
    if(this.id != null){

      const observer = {
        next: (resp:any) => {
          console.log('Job Offer deleted');
          this.router.navigate(['/joboffers'] )

        },
        error: (err:any) =>{
          console.log("Error when close contract!");
          console.log(err);
        }
        
      }


      var subscription = this.jobOfferService.deleteJobOffer(parseInt(this.id)).subscribe(observer);
    }

  }


}
