import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-joboffer-info',
  templateUrl: './joboffer-info.component.html',
  styleUrls: ['./joboffer-info.component.scss']
})
export class JobofferInfoComponent implements OnInit {
  @Input() creationName:string = "";
  @Input() creationId:number = 0;
  @Input() description:string = "";
  @Input() lowPrice:number = 0;
  @Input() highPrice:number = 0;
  @Input() daysAgo:number = 0 ;
  @Input() id:number = -1; 
  @Input() title:string = "";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showDetails(){
    console.log("Afisam detalii pentru Id:",this.id);
    this.router.navigate(['/jobofferpage',this.id]).then(() => {
      window.location.reload();
    });
  }

  showDetails2(){
    console.log('Trimitem la jobofferpage ID:',this.id);
    this.router.navigate(['/jobofferpage'],{state:{IdJobOffer:this.id}}).then(() => {
      //Pentru mentinerea state-ului in stack-ul de history al browserului nu trebuie sa dam refresh.
      //https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
      //https://developer.mozilla.org/en-US/docs/Web/API/History/state
      //window.location.reload();
    });
  }

  showProfile(){
    // console.log('Trimitem la Profile Page ID:',this.creationId);
    // this.router.navigate(['/profile'],{state:{IdUser:this.creationId}}).then(() => {
    //   //Pentru mentinerea state-ului in stack-ul de history al browserului nu trebuie sa dam refresh.
    //   //https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
    //   //https://developer.mozilla.org/en-US/docs/Web/API/History/state
    //   //window.location.reload();
    // });

    
    this.router.navigate(['/profile']);

  }

}
