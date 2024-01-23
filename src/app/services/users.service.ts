import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:string='http://localhost:3200';

  constructor(private http: HttpClient, private authService:SocialAuthService, private utilityService:UtilityService, private router: Router) { }

  registration(user:any){
    return this.http.post(`${this.api}/auth/registration`, user);
  }

  login(user:any){
    return this.http.post(`${this.api}/auth/login`,user);
  }

  onGoogleLogin(user:any){
    return this.http.post(`${this.api}/auth/google-login`, user);
  }

  forgotPassword(details:any){
    return this.http.post(`${this.api}/auth/forgot-password`, details);
  }

  isResetPasswordLinkValid(jwtToken:string){
    return this.http.get(`${this.api}/auth/is-reset-password-link-valid/${jwtToken}`);
  }

  resetPassword(password: string | null | undefined, jwtToken:string){
    return this.http.post(`${this.api}/auth/reset-password/${jwtToken}`, {password});
  }

  getLoggedInUserDetails(){
    let jwtToken=localStorage.getItem('token');
    let headers=new HttpHeaders().set('authorization', `bearer ${jwtToken}`);
    return this.http.get(`${this.api}/users/get-current-user-details`,{headers});
  }

  verifyJwt(){
    let jwtToken=localStorage.getItem('token');
    let headers=new HttpHeaders().set('authorization', `bearer ${jwtToken}`);
    return this.http.get(`${this.api}/users/verify-jwt`,{headers});
  }

  signOutUser(){
    this.authService.signOut();
    localStorage.removeItem('token');
    this.utilityService.userToken.next({token:null});
    this.router.navigate(['/login']);
  }

  updateUser(userDetails:any){
    let jwtToken=localStorage.getItem('token');
    let headers=new HttpHeaders().set('authorization', `bearer ${jwtToken}`);
    return this.http.put(`${this.api}/users/update-user`,userDetails,{headers});
  }

  changePassword(password:string){
    let jwtToken=localStorage.getItem('token');
    let headers=new HttpHeaders().set('authorization', `bearer ${jwtToken}`);
    return this.http.put(`${this.api}/users/change-password`,{password},{headers});
  }

}
