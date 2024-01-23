import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api:string='http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllMovies(){
    return this.http.get(`${this.api}/movies/get-all-movies`);
  }

  getMoviesByCityId(cityId:number){
    return this.http.get(`${this.api}/movies/get-movies-by-cityid/${cityId}`);
  }

  getAllUpcomingMovies(){
    return this.http.get(`${this.api}/movies/get-all-upcoming-movies`);
  }

  getUpcomingMoviesByCityId(cityId:number){
    return this.http.get(`${this.api}/movies/get-upcoming-movies-by-cityid/${cityId}`);
  }

  getMovie(movieId:number){
    return this.http.get(`${this.api}/movies/get-movie/${movieId}`);
  }
}
