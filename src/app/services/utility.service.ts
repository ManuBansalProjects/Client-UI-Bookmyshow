import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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
}
