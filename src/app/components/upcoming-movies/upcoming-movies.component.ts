import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent {

  movies:any[]=[];  displayableMovies:any[]=[];
  languages:string[]=[];  genres:string[]=[];  format:string[]=[];  releaseDate:string[]=[]
  languagesHashMap=new Map();  genresHashMap=new Map();  formatHashMap=new Map();  releaseDateHashMap=new Map();
  countActiveDates=0;

  constructor(private moviesService: MoviesService, private utilityService: UtilityService){ }

  ngOnInit(): void {
    this.utilityService.city.subscribe(res=>{
      if(res.id){
        this.getMoviesByCityId(res.id);
      }else{
        this.getAllMovies();
      }
    })
  }

  getAllMovies(){
    this.moviesService.getAllUpcomingMovies().subscribe((response:any)=>{
      this.displayableMovies= this.movies =response.movies;
      this.setFiltersOnLoad();
    })
  }
  
  getMoviesByCityId(cityId:number){
    this.moviesService.getUpcomingMoviesByCityId(cityId).subscribe((response:any)=>{
      this.displayableMovies = this.movies =response.movies;
      console.log(this.movies);
      this.setFiltersOnLoad();
    })
  }

  setFiltersOnLoad(){
    this.languages = this.genres = this.format = this.releaseDate= [];
    this.languagesHashMap.clear();  this.genresHashMap.clear(); this.formatHashMap.clear(); this.releaseDateHashMap.clear();
    for(let movie of this.movies){
      this.languages=this.languages.concat(movie.languages.split(","));
      this.genres=this.genres.concat(movie.genres.split(","));
      this.format=this.format.concat(movie.format.split(","));

      const date = new Date(movie.releaseddate);
      const month = date.toLocaleString('default', { month: 'short' });
      let year:number=date.getFullYear();
      this.releaseDate.push(month + ' ' + year);
    }
    let obj:any;
    obj=this.removeDuplicates(this.languages,this.languagesHashMap);
    this.languages=obj.arr;  this.languagesHashMap=obj.hashMap;
    obj=this.removeDuplicates(this.genres,this.genresHashMap);
    this.genres=obj.arr;  this.genresHashMap=obj.hashMap;
    obj=this.removeDuplicates(this.format,this.formatHashMap);
    this.format=obj.arr;  this.formatHashMap=obj.hashMap;
    obj=this.removeDuplicates(this.releaseDate,this.releaseDateHashMap);
    this.releaseDate=obj.arr;  this.releaseDateHashMap=obj.hashMap;
  }

  removeDuplicates(arr:string[], hashMap:any){
    arr=arr.filter((value,index,array)=>{
      if(array.indexOf(value) === index){
        hashMap.set(value, 0);
        return 1
      }else{
        return 0;
      }
    })
    return {arr, hashMap};
  }

  filterMovies(item:string,hashMap:any, type:string){
      if(hashMap.get(item)==0){
        hashMap.set(item,1);
        this.setHashMap(type,hashMap);
        if(type=='releaseDate'){
          this.countActiveDates++;
          this.filterMoviesFromStart();
        }
        else{
          this.displayableMovies=this.displayableMovies.filter((value,index,array)=>{  
            let splitedArray:string[];
            if(type=='languages'){
              splitedArray=value.languages.split(",");
            }else if(type=='genres'){
              splitedArray=value.genres.split(",");
            }else{
              splitedArray=value.format.split(",");
            }
            return splitedArray.includes(item);
          })
        }
      }else{
        hashMap.set(item,0);
        this.setHashMap(type,hashMap);
        if(type=='releaseDate'){
          this.countActiveDates--;
          this.filterMoviesFromStart();
        }
        else{
          this.filterMoviesFromStart();
        }
      }
  }

  setHashMap(type:string,hashMap:any){
    if(type=='languages'){
      this.languagesHashMap=hashMap;
    }else if(type=='genres'){
      this.genresHashMap=hashMap;
    }else if(type=='format'){
      this.formatHashMap=hashMap;
    }else{
      this.releaseDateHashMap=hashMap;
    }
  }

  filterMoviesFromStart(){
      this.displayableMovies=this.movies.filter((value,index,array)=>{
        let notExists=0;
        if(!this.isMovieExistsAccordingToFilters(value.languages.split(","), this.languagesHashMap) || 
          !this.isMovieExistsAccordingToFilters(value.genres.split(","), this.genresHashMap) ||
          !this.isMovieExistsAccordingToFilters(value.format.split(","), this.formatHashMap)){
            return 0;
        }else {
          if(this.countActiveDates > 0){
            const d = new Date(value.releaseddate);
            const month = d.toLocaleString('default', { month: 'short' });
            let year:number=d.getFullYear();
            let date=month + ' ' + year;
            return this.releaseDateHashMap.get(date)==1;
          }
          else{
            return 1;
          }
        }
      })
  }

  isMovieExistsAccordingToFilters(arr:string[], hashMap:any){
      let notExists=0;
      hashMap.forEach((value:any, key:any)=>{
        if(value && !arr.includes(key)){
          notExists=1;
        }
      })
      return !notExists;
  }
 
  clearAll(type:string){
    if(type=='languages'){
      this.languagesHashMap.forEach((value,key)=>{
        this.languagesHashMap.set(key,0);
      })
    }
    else if(type=='genres'){
      this.genresHashMap.forEach((value,key)=>{
        this.genresHashMap.set(key,0);
      })
    }
    else if(type=='format'){
      this.formatHashMap.forEach((value,key)=>{
        this.formatHashMap.set(key,0);
      })
    }
    else{
      this.countActiveDates=0;
      this.releaseDateHashMap.forEach((value,key)=>{
        this.releaseDateHashMap.set(key,0);
      })
    }
    this.filterMoviesFromStart();
  }

}
