import { Component, Input, OnInit } from '@angular/core';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating!: number;
  @Input() totalnofeedbacks!:number;

  faStarRegular = faStarRegular;
  faStarHalfAlt = faStarHalfAlt;
  faStarSolid = faStarSolid;

  iconClass:{[key: number]: any} = {
    0: faStarRegular,
    0.5: faStarHalfAlt,
    1: faStarSolid
  }

  stars: number[] = [0, 0, 0, 0, 0]; //five empty stars

  constructor() { }

  ngOnChanges(){
    this.fillStars();
  }

  ngOnInit() {
    
  }

  fillStars(){
    var starsToFill = Math.round(this.rating * 2)/2; //round to nearest 0.5
    var i = 0;
    while(starsToFill > 0.5){
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }
    if(starsToFill === 0.5){
      this.stars[i] = 0.5;
    }
  }



}
