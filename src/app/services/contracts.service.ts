import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private baseUrl: string = environment.baseUrl;
  private publicHeaders = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }

  constructor(private http:HttpClient) { 
  }

  getAllContracts(){
    return this.http.get(this.baseUrl + '/api/Contracts/allavailable',this.publicHeaders);
  }

  getContractsForHomePage(){
    return this.http.get(this.baseUrl + '/api/Contracts/allavailable/forhomepage',this.publicHeaders);
  }
}
