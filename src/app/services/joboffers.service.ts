import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JobOffer } from '../interfaces/job-offer';
@Injectable({
  providedIn: 'root'
})
export class JoboffersService {

  private baseUrl: string = environment.baseUrl;
  private publicHeaders = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }

  private privateHeaderCreateForm ={
    headers:new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('token'),
    })
  }

  constructor(private http:HttpClient) { 
  }

  getAllJobOffers(){
    return this.http.get(this.baseUrl + '/api/JobOffer/allJobOffers',this.publicHeaders);
  }

  createJobOffer(data:JobOffer){
    return this.http.post(
      this.baseUrl + "/api/JobOffer/create",
      data,
      this.publicHeaders);
  }

  createJobOfferForm(data:FormData){
    console.log('Am primit data:')
    console.log(data)
    console.log(' IdSkills')
    console.log(data.get('IdSkills'));

    return this.http.post(
      this.baseUrl + "/api/JobOffer/create",
      data);
  }

  getSpecificJobOffer(id:number){
    //Asa se declara un obiect json
     var data:any = {};
     data.Id = id;
     data.UserId = localStorage.getItem("loggedInId");
    return this.http.post(
      this.baseUrl + "/api/JobOffer/getById",
      data,
      this.publicHeaders);
  }

  getSkills(){
    return this.http.get(
      this.baseUrl + '/api/skills/all'
    );
  }

}
