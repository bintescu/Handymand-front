import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { City } from 'src/app/interfaces/city';
import { Skill } from 'src/app/interfaces/skill';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DialogJobofferComponent } from '../dialog-joboffer/dialog-joboffer.component';
import { environment } from 'src/environments/environment';
import { JoboffersService } from 'src/app/services/joboffers.service';


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
  @Input() location:string="";
  @Input() skills:Skill[] = [];
  @Input() city:City | null = null;
  @Input() noImages:number|null = null;

  private IvEnv:CryptoJS.lib.WordArray  = CryptoJS.lib.WordArray.random(16);
  private keyEnv: string = environment.key;


  constructor(private router:Router,private dialog:MatDialog, private authService:AuthService) { }

  ngOnInit(): void {
  }

  showDetails(){

    const sentData = {
      "IdJobOffer" : this.id,
      "CreationId" : this.creationId,
      "Description": this.description,
      "Title": this.title,
      "Location":this.location,
      "CreationName":this.creationName,
      "NoImages":this.noImages
    }
    const dialogRef = this.dialog.open(DialogJobofferComponent, {
      width:'30%',
      data:sentData,
      panelClass: 'custom-dialog-container'
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

  viewJob(){
    console.log('view job clicked!')
  }


  showProfile(){
    // console.log('Trimitem la Profile Page ID:',this.creationId);
    // this.router.navigate(['/profile'],{state:{IdUser:this.creationId}}).then(() => {
    //   //Pentru mentinerea state-ului in stack-ul de history al browserului nu trebuie sa dam refresh.
    //   //https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
    //   //https://developer.mozilla.org/en-US/docs/Web/API/History/state
    //   //window.location.reload();
    // });

    
    var cryptedId = this.authService.set(this.creationId.toString(),this.keyEnv,this.IvEnv)
    var IvBase64 = CryptoJS.enc.Base64.stringify(this.IvEnv);
    this.router.navigate(['/profile'], { state: { cryptedId: cryptedId, IvBase64:IvBase64 } } );

  }

}
