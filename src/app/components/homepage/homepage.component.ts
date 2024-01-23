import { WeekDay } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CitiesService } from 'src/app/services/cities.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit{

  movies:any[]=[];
  moviesToDisplay:any[]=[];

  premiere:any[]=[];

  constructor(private moviesService: MoviesService, private citiesService: CitiesService, private utilityService: UtilityService){ }

  loader:any;

  ngOnInit(): void {
    this.utilityService.city.subscribe(res=>{
      if(res.id){
        this.getMoviesByCityId(res.id);
      }
      else{
        this.getAllMovies();
      }
    })

    this.utilityService.loader.subscribe(res=>{
      this.loader=res;
    })
  }

  getAllMovies(){
    this.moviesService.getAllMovies().subscribe((response:any)=>{
      this.movies=response.movies;
      if(this.movies.length >4){
        for(let i=0;i<4;i++)this.moviesToDisplay[i]=this.movies[i];
      }
      else{
        this.moviesToDisplay=this.movies;
      }
      this.setPremiere();
    })
  }

  getMoviesByCityId(cityId:number){
    this.moviesService.getMoviesByCityId(cityId).subscribe((response:any)=>{
      this.movies=response.movies;
      if(this.movies.length >4){
        for(let i=0;i<4;i++)this.moviesToDisplay[i]=this.movies[i];
      }
      else{
        this.moviesToDisplay=this.movies;
      }
      this.setPremiere();
    })
  }

  setPremiere(){
    this.premiere=[];
    for(let movie of this.movies){
      const date=new Date(movie.releaseddate);
      if(date.getDay() == 5){
        this.premiere.push(movie);
      }
    }  
  }

}
