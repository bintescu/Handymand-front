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

  id!: string | null;
  firstName:string = "";
  location:string = "";
  jobOffer!: JobOffer;


  constructor(private route: ActivatedRoute , private jobOfferService: JoboffersService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')

    if(this.id != null){
      this.jobOfferService.getSpecificJobOffer(parseInt(this.id)).subscribe( (response:any) => {
        this.firstName = response.firstName;
        this.location = response.location;
      })
    }

  }

  changeImage(element:any) {
    console.log("element:")
    console.log(element);
    var main_prodcut_image = <HTMLImageElement> document.getElementById('main_product_image');
    main_prodcut_image.src = element.target.src;
    

}




}
