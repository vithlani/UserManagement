import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { ProfileUser, RegisterUser, User } from '../models/userProfileModel';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_BASE_PATH = environment.apiUrl;
  PROFILE_URL = environment.profileApiUrl;
  REGISTER_URL = environment.registrationApiUrl;
  LOGIN_URL = environment.loginApiUrl;

  constructor(private commonService: CommonService) {}

  getUserProfile(): Observable<User> {
    const url = this.API_BASE_PATH + this.PROFILE_URL;
    return this.commonService.getRequest<User>(url);
  }

  putUserProfile(updateUser: ProfileUser): Observable<User> {
    const url = this.API_BASE_PATH + this.PROFILE_URL;
    return this.commonService.putRequest<ProfileUser>(url, updateUser);
  }

  registerUserProfile(registerUser: RegisterUser): Observable<RegisterUser> {
    const url = this.API_BASE_PATH + this.REGISTER_URL;
    return this.commonService.postRequest<RegisterUser>(url, registerUser);
  }

  loginuserProfile(loginUser: User): Observable<User> {
    const url = this.API_BASE_PATH + this.LOGIN_URL;
    return this.commonService.postRequest<User>(url, loginUser);
  }
}
