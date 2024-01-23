import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  //for current city
  city=new BehaviorSubject< {id: number|null, name: string|null, stateid: number|null} >
  ( { id: this.getCityId(), name: this.getCityName(), stateid: this.getStateId() } ) ;

  setLocalStorage(city:any){
    localStorage.setItem('id', String(city.id));
    localStorage.setItem('name', String(city.name));
    localStorage.setItem('stateid', String(city.stateid));
  }
  getCityId(){
    return Number(localStorage.getItem('id'));
  }
  getCityName(){
    return String(localStorage.getItem('name'));
  }
  getStateId(){
    return Number(localStorage.getItem('stateid'));
  }




  //for loader
  loader=new BehaviorSubject<boolean>( false );




  //for token
  userToken=new BehaviorSubject<{token:string|null}>( {token:this.getTokenFromLocalStorage()} );
  setTokenToLocalStorage(token:string){
    localStorage.setItem('token', token);
  }
  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }



  
  //for users's details
  userDetails=new BehaviorSubject<{user: any}>( {user: null} );             



  //for user's details
  // userDetails=new BehaviorSubject<any>( this.getDetailsFromLocalStorage() );

  // //set users details to local storage
  // setDetailsToLocalStorage(details:any){
  //   localStorage.setItem('token', details.token);
  //   localStorage.setItem('user', JSON.stringify(details.user));
  // }
  // getDetailsFromLocalStorage(){
  //   return { user: JSON.parse(String(localStorage.getItem('user'))), token: localStorage.getItem('token') };
  // }




}
