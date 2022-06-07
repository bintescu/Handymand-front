import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss']
})
export class JobOfferPageComponent implements OnInit {

  Id!: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params => {
      console.log(params);
      this.Id = params.get('id');
      console.log(this.Id);
    }
  );
  }

}
