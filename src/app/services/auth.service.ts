import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../pages/login/login.component';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private publicHeaders = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }

  constructor(private http:HttpClient) { 
  }

  login(data: User){
    return this.http.post(
      this.baseUrl + "/api/Users/authenticate",
      data,
      this.publicHeaders);
  }

  register(data: User){
    return this.http.post(
      this.baseUrl + "/api/Users/create",
      data,
      this.publicHeaders);
  }
}
