import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-book-show',
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.css']
})

export class BookShowComponent implements OnInit{
  constructor(private moviesService:MoviesService, private activatedRoute: ActivatedRoute, private cinemasService:CinemasService){}

  movie:any;
  day:any;
  month:any;
  year:any;
  cinemas:any[]=[];
  filteredCinemas:any[]=[];
  screeningDate:string[]=[];
  formats:string[]=[];
  selectedDate?:string;
  selectedFormat?:string;
  tempSelectedTime?:string='9am';

 ngOnInit(){
    this.moviesService.getMovie(this.activatedRoute.snapshot.params['movieId']).subscribe((response:any)=>{
      this.movie=response.movie;
      let date=new Date(this.movie.releaseddate);
      this.day=date.getDate();
      this.month= date.toLocaleString('default', { month: 'short' });
      this.year=date.getFullYear();
    })
    
    this.cinemasService.getCinemas(Number(localStorage.getItem('id')), this.activatedRoute.snapshot.params['movieId']).subscribe((response:any)=>{
      this.cinemas=JSON.parse(JSON.stringify(response.cinemas));
      console.log('main response', this.cinemas);
      this.setScreeningDateAndFormats();
      this.selectedDate=this.screeningDate[0];
      this.selectedFormat=this.formats[0];
      this.filterCinemas();
    })

  }

  setScreeningDateAndFormats(){
    for(let cinema of this.cinemas){
      for(let screen of cinema.screens){
        this.screeningDate=this.screeningDate.concat(screen.screeningdate.split(','));
        if(!this.formats.includes(screen.format)){
          this.formats.push(screen.format);
        }
      }
    }
    this.removeDuplicates();
  }

  removeDuplicates(){
    this.screeningDate=this.screeningDate.filter((value,index,arr)=>{
      return arr.indexOf(value)==index;
    })
  }

  changeDate(event:any){
    this.selectedDate=event.target.value;
    this.filterCinemas();
  }
  changeFormat(event:any){
    this.selectedFormat=event.target.value;
    this.filterCinemas();
  }

  filterCinemas(){
    const cinemas:any[]=JSON.parse(JSON.stringify(this.cinemas));
    this.filteredCinemas=[];
    for(let cinema of cinemas){
      let filteredScreens:any[] = cinema.screens.filter((value:any,index:number,arr:any)=>{
        let dates:string[]=value.screeningdate.split(',');
        return dates.includes(String(this.selectedDate)) && (value.format==this.selectedFormat);
      })
      if(filteredScreens.length > 0){
        cinema.screens=filteredScreens;
        this.filteredCinemas.push(cinema);
      }
    }
  }

  
  viewCinemaInfo:any;
  setViewCinemaInfo(cinema:any){
    this.viewCinemaInfo=cinema;
  }

}
