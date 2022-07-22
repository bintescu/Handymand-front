import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User = {
    id : 0,
    username : '',
    email : '',
    firstName :'',
    lastName : '',
    password: '',
    location: '',
    walletAddress:'',
    aboutMe : '',
    address:'',
    phone:'',
    title:'',
    role: -1,
    birthday: new Date()
  }
  
  

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

}
