import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { City } from 'src/app/interfaces/city';
import { JobOffer } from 'src/app/interfaces/job-offer';
import { Skill } from 'src/app/interfaces/skill';
import { JoboffersService } from 'src/app/services/joboffers.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {

  public noOfItems ?:number = 0;
  public joboffers?: JobOffer[];
  public history_joboffers?: JobOffer[];
  isLoading = false;
  length = 3;
  pageSize = 3;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 6, 9, 12];
  previousPageIndex: number | undefined;
  selectedSort:any;
  onlymyoffers:boolean = false;
  token:string|null|undefined = null;

  showMyOffers:boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public myForm!:UntypedFormGroup;

  dropdownSettings:IDropdownSettings={};
  dropdownList:Skill[] = [];

  cities:City[] = [];
  
  constructor(private jobofferservice : JoboffersService, private router:Router,private formBuilder:UntypedFormBuilder) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token != null && this.token != undefined){
      this.showMyOffers = true;
    }

    this.myForm = this.formBuilder.group({
      creatorName:[''],
      cityId:null,
      keywords : [''],
      skills:[],
      lowPriceRange:null ,
      highPriceRange:null,
      myJobOffers:false
    })

    this.getAllJobOffers();




    const observer = {
      next : (result:any) => {
        this.dropdownList = result.data;

        this.dropdownSettings = {
          idField: 'id',
          textField: 'skillName',
          enableCheckAll: true,
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
        };
      },
      error: (err:any) => {
        console.log('eroare in get skills pe create job offer:')
        console.log(err)
      }
    }
    this.jobofferservice.getSkills().subscribe(observer);

    const observerCities = {
      next: (result:any) => {
        this.cities = result.data;
      },
      error: (err:any) => {
        console.log('eroare pe get all cities')
      }
    }

    this.jobofferservice.getCities().subscribe(observerCities);


    this.onFormChanges();
  }


  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  getAllJobOffers(){

    const observer = {

      next: (response:any) => {

        this.joboffers = response.data;
        this.noOfItems = this.joboffers?.length;
        var today = new Date();
        this.joboffers?.forEach((element, index) => {
          var creationDate = new Date(element.dateCreated);
          element.daysAgo = parseInt(((today.getTime() - creationDate.getTime())/ (1000 * 3600 * 24)).toFixed());
        })
        
        this.doSort();
      },
      error: (err:any) => {
        console.log('avem eroare:')
        console.log(err);
      }
    }

    this.jobofferservice.getAllJobOffers(this.currentPage,this.pageSize,this.myForm.value).subscribe(observer);
    this.setTotalPages();
  }

  setTotalPages(){

    const observer = {
      next: (response:any) => {

        this.length = response.data;
      },
      error: (err:any) => {
        this.length = 1;
        console.log('eroare')
        console.log(err);
      }
    }

    this.jobofferservice.getTotalLength(this.myForm.value).subscribe(observer);
  }


  changeMyoffers(event:any){
    this.onlymyoffers = event.checked;
    this.myForm.controls["myJobOffers"].setValue(event.checked);
    this.getAllJobOffers();
  }


  doSortOnlyMyOffers(){
    if(this.onlymyoffers == true && this.showMyOffers == true){
      this.history_joboffers = this.joboffers;
      this.joboffers = this.joboffers?.filter((obj) => {
        return obj.idCreationUser == this.parseJwt(this.token).id;
      })
    }
    else{
      if(this.history_joboffers != undefined && this.history_joboffers.length >= 1){
        this.joboffers = this.history_joboffers;
      }

    }
  }

  
  changeSort(event:any){
    this.selectedSort = event.target.value;
    this.doSort();
  }

  doSort(){
    if(this.selectedSort != undefined){
      switch (parseInt(this.selectedSort)) {
        case 1:{
          this.joboffers = this.joboffers?.sort((a,b)=> (new Date(a.dateCreated).getTime() > new Date(b.dateCreated).getTime()) ? -1 : 1); 
          break;
        }
        case 2:{
          this.joboffers = this.joboffers?.sort((a,b)=> (new Date(a.dateCreated).getTime() < new Date(b.dateCreated).getTime()) ? -1 : 1); 
          break;
        }
        case 3:{
          this.joboffers = this.joboffers?.sort((a,b) => ( ((a.lowPriceRange + a.highPriceRange)/2) > ((b.lowPriceRange + b.highPriceRange)/2) ) ? -1 : 1 )
          break;
        }
        case 4:{
          this.joboffers = this.joboffers?.sort((a,b) => ( ((a.lowPriceRange + a.highPriceRange)/2) < ((b.lowPriceRange + b.highPriceRange)/2) ) ? -1 : 1 )
          break;
        }

        default:
          break;
      }
    }

  }


  clearFilter(){
    let myOffersBool:boolean|null =  this.myForm.controls["myJobOffers"].value;

    this.myForm.reset();

    if(myOffersBool == null){
      this.myForm.controls["myJobOffers"].setValue(false);
    }else{
      this.myForm.controls["myJobOffers"].setValue(myOffersBool);
    }
    this.getAllJobOffers();
  }


  createJobOffer(){
    this.router.navigate(['/hire'])
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex;
    this.history_joboffers = undefined;
    this.getAllJobOffers();
  }

  onFormChanges():void{

    const control1 = <UntypedFormControl>this.myForm.get('lowPriceRange');
    const control2 = <UntypedFormControl>this.myForm.get('highPriceRange');

    control2.valueChanges.subscribe((value: number) => {
      if (value < control1.value) {
        control1.setValidators([Validators.max(control2.value)])
      }
    })

    control1.valueChanges.subscribe((value: number) => {
      if (value > control2.value) {
        control2.setValidators([Validators.min(control1.value)])
      }

      control2.updateValueAndValidity();
    })
  }



}
