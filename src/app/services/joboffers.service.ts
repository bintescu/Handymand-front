import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getSpecificJobOffer(id:number){
    return this.http.post(
      this.baseUrl + "/api/JobOffer/getById",
      id,
      this.publicHeaders);
  }

}
