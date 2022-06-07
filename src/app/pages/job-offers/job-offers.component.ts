import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/interfaces/job-offer';
import { JoboffersService } from 'src/app/services/joboffers.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {

  public noOfItems ?:number = 0;
  public joboffers?: JobOffer[];

  constructor(private jobofferservice : JoboffersService) { }

  ngOnInit(): void {
    this.getAllJobOffers();
  }

  getAllJobOffers(){
    this.jobofferservice.getAllJobOffers().subscribe((response:any) => {
      this.joboffers = response;
      this.noOfItems = this.joboffers?.length;
      var today = new Date();
      this.joboffers?.forEach((element, index) => {
        var creationDate = new Date(element.dateCreated);
        element.daysAgo = parseInt(((today.getTime() - creationDate.getTime())/ (1000 * 3600 * 24)).toFixed());
      })

    })
  }

}
