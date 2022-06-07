import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public id:string = '';

  constructor(private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) =>{
      console.log(params);
      this.id = params['id'];
    });

    this.activatedRoute.queryParams.subscribe((qparams:any) => {
      console.log(qparams);
    });
  }

}
