import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private baseUrl: string = environment.baseUrl;
  private publicHeaders = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }

  constructor(private http:HttpClient, private userService:UserService) { 
  }

  createOffer(data:any){
    return this.http.post(
      this.baseUrl + "/api/offers/create",
      data,
      this.publicHeaders);
  }

  getAllOffersForJobOffer(id:number,pageNr:number,noElements:number,sortOption:number){
    return this.http.get(
      this.baseUrl + "/api/offers/getall/" + id + "?pageNr=" + pageNr + "&noElements=" + noElements +"&sortOption=" + sortOption ,
      this.publicHeaders
    )
  }

  getTotalNoOffers(id:number){
    return this.http.get(
      this.baseUrl + "/api/offers/total/" + id,
      this.publicHeaders
    )
  }

  getAllForLoggedIn(){
    return this.http.get(
      this.baseUrl + "/api/offers/getallforloggedin/",
      this.publicHeaders
    )
  }

  getAllAcceptedForLoggedIn(){
    return this.http.get(
      this.baseUrl + "/api/offers/getallacceptedforloggedin/",
      this.publicHeaders
    )
  }

  acceptOffer(data:any){
    return this.http.post(
      this.baseUrl + "/api/offers/accept",
      data,
      this.publicHeaders
    )
  }

  getRatingForFreelancer(id:number){
    return this.http.get(
      this.baseUrl + "/api/offers/getratingfreelancer/"+ id,
      this.publicHeaders 
    )
  }

  getRatingForCustomer(id:number){
    return this.http.get(
      this.baseUrl + "/api/offers/getratingcustomer/"+ id,
      this.publicHeaders 
    )
  }


}
