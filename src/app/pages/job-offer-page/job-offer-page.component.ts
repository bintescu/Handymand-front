import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/interfaces/job-offer';
import { JoboffersService } from 'src/app/services/joboffers.service';

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss']
})
export class JobOfferPageComponent implements OnInit {

  Id!: string | null;
  firstName:string = "";
  location:string = "";
  jobOffer!: JobOffer;

  constructor(private route: ActivatedRoute , private jobOfferService: JoboffersService) { }

  ngOnInit(): void {
    /*this.route.paramMap
    .subscribe(params => {
      console.log(params);
      this.Id = params.get('id');
      console.log(this.Id);
    });*/
    this.Id = history.state.IdJobOffer;
    console.log('Am primit history state:')
    console.log(history.state);

    if(this.Id != null){
      this.jobOfferService.getSpecificJobOffer(parseInt(this.Id)).subscribe( (response:any) => {
        this.firstName = response.firstName;
        this.location = response.location;
      })
    }

  }




}
