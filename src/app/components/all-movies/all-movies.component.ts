import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit{

  movies:any[]=[];  displayableMovies:any[]=[];
  languages:string[]=[];  genres:string[]=[];  format:string[]=[];
  languagesHashMap=new Map();  genresHashMap=new Map();  formatHashMap=new Map();
  
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
    this.moviesService.getAllMovies().subscribe((response:any)=>{
      this.displayableMovies= this.movies =response.movies;
      this.setFiltersOnLoad();
    })
  }
  
  getMoviesByCityId(cityId:number){
    this.moviesService.getMoviesByCityId(cityId).subscribe((response:any)=>{
      this.displayableMovies = this.movies =response.movies;
      console.log(this.movies);
      this.setFiltersOnLoad();
    })
  }

  setFiltersOnLoad(){
    this.languages = this.genres = this.format = [];
    this.languagesHashMap.clear();  this.genresHashMap.clear(); this.formatHashMap.clear();
    for(let movie of this.movies){
      this.languages=this.languages.concat(movie.languages.split(","));
      this.genres=this.genres.concat(movie.genres.split(","));
      this.format=this.format.concat(movie.format.split(","));
    }
    let obj:any;
    obj=this.removeDuplicates(this.languages,this.languagesHashMap);
    this.languages=obj.arr;  this.languagesHashMap=obj.hashMap;
    obj=this.removeDuplicates(this.genres,this.genresHashMap);
    this.genres=obj.arr;  this.genresHashMap=obj.hashMap;
    obj=this.removeDuplicates(this.format,this.formatHashMap);
    this.format=obj.arr;  this.formatHashMap=obj.hashMap;
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

  filterMovies(item:string, hashMap:any, type:string){
      if(hashMap.get(item)==0){
        hashMap.set(item,1);
        //now filter the current movie array by given item and hashMap
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
      }else{
        hashMap.set(item,0);
        this.filterMoviesFromStart();
      }

      if(type=='languages'){
        this.languagesHashMap=hashMap;
      }else if(type=='genres'){
        this.genresHashMap=hashMap;
      }else{
        this.formatHashMap=hashMap;
      }
  }

  filterMoviesFromStart(){
      this.displayableMovies=this.movies.filter((value,index,array)=>{
        let notExists=0;
        if(!this.isMovieExistsAccordingToFilters(value.languages.split(","), this.languagesHashMap) || 
          !this.isMovieExistsAccordingToFilters(value.genres.split(","), this.genresHashMap) ||
          !this.isMovieExistsAccordingToFilters(value.format.split(","), this.formatHashMap) ){
            return 0;
        }else {
          return 1;
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
    else{
      this.formatHashMap.forEach((value,key)=>{
        this.formatHashMap.set(key,0);
      })
    }
    this.filterMoviesFromStart();
  }

}
