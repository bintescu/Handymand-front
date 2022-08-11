import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JobOffer } from '../interfaces/job-offer';
import { UserService } from './user.service';
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

  constructor(private http:HttpClient, private userService:UserService) { 
  }

  getAllJobOffers(pageNr:number,noElements:number, data:any){

    if(pageNr < 0 || noElements == 0){
      return this.http.post(this.baseUrl + '/api/JobOffer/allJobOffers',
      data,
      this.publicHeaders);
    }
    else{
      return this.http.post(
      this.baseUrl + '/api/JobOffer/allJobOffers?pageNr=' + pageNr + "&noElements=" + noElements,
      data,
      this.publicHeaders);
    }

  }

  getTotalLength(filter:any){
    return this.http.post(
      this.baseUrl + '/api/JobOffer/total',
      filter,
      this.publicHeaders
    )
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
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getById/" + id,
      this.publicHeaders);
  }

  getSkills(){
    return this.http.get(
      this.baseUrl + '/api/skills/all'
    );
  }

  getCities(){
    return this.http.get(
      this.baseUrl + '/api/JobOffer/allcities'
    )
  }

  getUserProfilePicture(data:any){
    return this.userService.getUserProfilePicture(data);
  }

  getImages(idJob:number,id:number){
    return this.http.get(
      this.baseUrl + '/api/JobOffer/getimage/'+ idJob + "?id=" + id,
      {
        responseType:"blob"
      }
      ) 

  }

  getAllForLoggedIn(){
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getallforloggedin/",
      this.publicHeaders
    )
  }

  getAllPendingForLoggedIn(){
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getallpendingforloggedin/",
      this.publicHeaders
    )
  }

  getAllClosedJobOfferForFeedback(){
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getallclosedforfeedback",
      this.publicHeaders 
    )
  }
  

  closeContract(idJobOffer:number, feedback:number){
    return this.http.post(
      this.baseUrl + "/api/JobOffer/closecontract/" + idJobOffer +"?feedbackVal=" + feedback ,
      this.publicHeaders
    )
  }

  sendFeedback(idJobOffer:number, feedback:number){
    return this.http.post(
      this.baseUrl + "/api/JobOffer/sendfeedback/" + idJobOffer +"?feedbackVal=" + feedback ,
      this.publicHeaders
    )
  }

  deleteJobOffer(idJobOffer:number){
    return this.http.post(
      this.baseUrl + "/api/JobOffer/deletejoboffer/" + idJobOffer,
      this.publicHeaders
    )
  }

  getCustomerName(idJobOffer:number){
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getcustomername/" + idJobOffer,
      this.publicHeaders
    )
  }

  getFreelancerName(idJobOffer:number){
    return this.http.get(
      this.baseUrl + "/api/JobOffer/getfreelancername/" + idJobOffer,
      this.publicHeaders
    )
  }

}
