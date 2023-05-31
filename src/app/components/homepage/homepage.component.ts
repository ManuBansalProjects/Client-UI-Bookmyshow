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

  constructor(private moviesService: MoviesService, private citiesService: CitiesService, private utilityService: UtilityService){ }

  ngOnInit(): void {
    this.utilityService.city.subscribe(res=>{
      if(res.id){
        this.getMoviesByCityId(res.id);
      }
      else{
        this.getAllMovies();
      }
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
    })
  }

}
