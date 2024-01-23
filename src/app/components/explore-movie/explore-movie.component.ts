import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-explore-movie',
  templateUrl: './explore-movie.component.html',
  styleUrls: ['./explore-movie.component.css']
})

export class ExploreMovieComponent implements OnInit{
  constructor(private moviesService:MoviesService, private activatedRoute:ActivatedRoute, private cinemasService:CinemasService, private router:Router){}

  movie:any;
  day:any;
  month:any;
  year:any;

  ngOnInit(): void {
    const movieId=this.activatedRoute.snapshot.params['movieId'];
    this.moviesService.getMovie(movieId).subscribe((response:any)=>{
      this.movie=response.movie;
      let date=new Date(this.movie.releaseddate);
      this.day=date.getDate();
      this.month= date.toLocaleString('default', { month: 'short' });
      this.year=date.getFullYear();
      console.log(this.movie);
    })
  }

  bookTickets(){

    this.router.navigate([`/book-show/${this.movie.id}`]);

  }

}
