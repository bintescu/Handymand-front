import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  

  userSubject = new Subject();

  private baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) {

  }


  getMyuser(){
    return  this.http.get(
      this.baseUrl + "/api/users/myuser"
    );
  }

  getMyProfilePicture(){
    return this.http.get(
      this.baseUrl + '/api/users/myuserprofileImage'
    );
  }

  updateMyUser(data:any){
    var result = this.http.put(
      this.baseUrl + "/api/users/updatemyuser",
      data
    )
    return result;
  }

  testEncryption(data:any){
      return this.http.post(
        this.baseUrl + "/api/users/profile/4",
        data
      )
  }

  

}
