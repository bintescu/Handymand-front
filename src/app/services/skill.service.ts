import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http:HttpClient) { }

  private baseUrl: string = environment.baseUrl;
  private publicHeaders = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }
  
  create(data:any){
    return this.http.post(
      this.baseUrl + "/api/skills/create",
      data,
      this.publicHeaders);
  }

  getAll(){
    return this.http.get(this.baseUrl + '/api/skills/allforadmin',this.publicHeaders);
  }

  update(data:any){
    return this.http.put(
      this.baseUrl + '/api/skills/update',
      data,
      this.publicHeaders
    )
  }

  delete(data:any){

    const options = {
      headers: new HttpHeaders({
          'content-Type': 'application/json'
      }),
      body: data
  } 


    return this.http.delete(
      this.baseUrl + '/api/skills/delete',
      options
    )
  }

}
