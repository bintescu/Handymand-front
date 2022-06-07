import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joboffer-info',
  templateUrl: './joboffer-info.component.html',
  styleUrls: ['./joboffer-info.component.scss']
})
export class JobofferInfoComponent implements OnInit {
  @Input() creationName:string = "";
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

}
