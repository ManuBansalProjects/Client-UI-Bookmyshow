import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  api:string='http://localhost:3100';

  constructor(private http: HttpClient) { }

  getAllCinemas(){
    return this.http.get(`${this.api}/cinemas/get-all-cinemas`);
  }

  getCinemasByCityId(cityId:number){
    return this.http.get(`${this.api}/cinemas/get-cinemas-by-cityid/${cityId}`);
  }

  getCinemasByNameOrAreaAndCityId(cinemaName:string, cityId:number){
    return this.http.get(`${this.api}/cinemas/get-cinemas-by-name-or-area-and-cityid/${cityId}?name=${cinemaName}`);
  }

  getCinema(cinemaId:number){
    return this.http.get(`${this.api}/cinemas/get-cinema/${cinemaId}`);
  }

  getCinemas(cityId:number, movieId:number){
    return this.http.get(`${this.api}/cinemas/get-cinemas/${cityId}/${movieId}`);
  }

  getScreen(screenId:number){
    return this.http.get(`${this.api}/cinemas/get-screen/${screenId}`);
  }
}
