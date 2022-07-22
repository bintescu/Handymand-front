import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    console.log('avem user id in userservice:');
    this.activatedRoute.params.subscribe((params:any) =>{
      console.log(params);
      this.id = params['id'];
    });
  }
}
