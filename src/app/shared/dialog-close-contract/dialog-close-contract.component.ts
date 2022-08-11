import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobOffersComponent } from 'src/app/pages/job-offers/job-offers.component';
import { JoboffersService } from 'src/app/services/joboffers.service';

@Component({
  selector: 'app-dialog-close-contract',
  templateUrl: './dialog-close-contract.component.html',
  styleUrls: ['./dialog-close-contract.component.scss']
})
export class DialogCloseContractComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef: MatDialogRef<DialogCloseContractComponent>, 
  private jobOfferService:JoboffersService,
  private router:Router,
  private elem: ElementRef) { }

  private feedBackValue:number = 0;

  private JobOfferId:number = 0;
  FromClient:boolean = false;
  FromFreelancer:boolean = false;
  UserName!:string;

  ngOnInit(): void {
    this.JobOfferId = this.editData.IdJobOffer;
    this.FromClient = this.editData.FromClient;
    this.FromFreelancer = this.editData.FromFreelancer;
    this.getDisplayName();
  }


  getDisplayName(){

    const observer = {
      next: (result:any) => {
        this.UserName = result.data;
      },
      error: (err:any) => {
        console.log("error when try to get name of closed contract in dialog!")
      }
    }

    if(this.FromClient){
      
      this.jobOfferService.getFreelancerName(this.JobOfferId).subscribe(observer);
    }
    else if(this.FromFreelancer){
      this.jobOfferService.getCustomerName(this.JobOfferId).subscribe(observer);
    }

  }



  setFeedback(){
    const fruits = this.elem.nativeElement.querySelectorAll('input[name="rating"]')
    console.log(fruits);
      for (const f of fruits) {
        if (f.checked) {
          this.feedBackValue = f.value;
        }
      }
  }

  sendFeedbackAndCloseContract(){

    if(this.FromClient){
      const observer = {
        next: (resp:any) => {
          this.dialogRef.close();
          this.router.navigate(['/joboffers'] )
  
        },
        error: (err:any) =>{
          console.log("Error when close contract!");
          console.log(err);
        }
        
      }
  
      this.jobOfferService.closeContract(this.JobOfferId,this.feedBackValue).subscribe(observer);
    }

    if(this.FromFreelancer){
      const observer = {
        next: (resp:any) => {
          this.dialogRef.close("sent");
        },
        error: (err:any) =>{
          console.log("Error when send feedback!");
          console.log(err);
        }
        
      }
  
      this.jobOfferService.sendFeedback(this.JobOfferId,this.feedBackValue).subscribe(observer);
    }

  }
  
}
