import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  api:string='http://localhost:3300';

  constructor(private http:HttpClient) { }

  getAllCities(){
    //observe response is used to recieve the full response
    return this.http.get(`${this.api}/cities/get-all-cities`,{observe: 'response'});
  }

 

}
