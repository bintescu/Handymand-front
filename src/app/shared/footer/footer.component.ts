import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { JoboffersService } from 'src/app/services/joboffers.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;

  totalJobOffers = 0;
  totalFreelancers = 0;

  faHome = faHome;
  faMail = faEnvelope;
  constructor(private jobofferservice:JoboffersService,private userService: UserService) { }

  ngOnInit(): void {

    this.setTotalFreelancers();
    this.setTotalJobOffers();
  }

  setTotalJobOffers(){

    const observer = {
      next: (response:any) => {

        this.totalJobOffers = response.data;
      },
      error: (err:any) => {
        console.log('eroare')
        console.log(err);
      }
    }
    this.jobofferservice.getTotalLength({}).subscribe(observer);
  }

  setTotalFreelancers(){

    const observer = {
      next: (response:any) => {

        this.totalFreelancers = response.data;
      },
      error: (err:any) => {
        console.log('eroare')
        console.log(err);
      }
    }

    this.userService.getTotalLength({}).subscribe(observer);
  }
 
}
