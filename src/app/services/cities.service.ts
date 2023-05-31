import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  api:string='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAllCities(){
    return this.http.get(`${this.api}/cities/get-all-cities`);
  }

 

}
