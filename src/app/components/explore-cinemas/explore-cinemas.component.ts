import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CinemasService } from 'src/app/services/cinemas.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-explore-cinemas',
  templateUrl: './explore-cinemas.component.html',
  styleUrls: ['./explore-cinemas.component.css']
})
export class ExploreCinemasComponent implements OnInit{

  cinemas:any[]=[];
  displayableCinemas:any[]=[];
  currentCity:any;
  searchedCinema:string='';

  constructor(private utilityService: UtilityService, private cinemasService: CinemasService){}
  // ngDoCheck(): void {
  //   console.log('do chweck called')
  // }

  ngOnInit(): void {
    this.utilityService.city.subscribe(res=>{
      if(res.id){
        this.currentCity=res;
        this.getCinemasByCityId();
      }
      else{
        this.getAllCinemas();
      }
    })
  }

  getAllCinemas(){
    this.cinemasService.getAllCinemas().subscribe((response:any)=>{
      this.cinemas=this.displayableCinemas= response.cinemas;
    })
  }

  getCinemasByCityId(){
    this.cinemasService.getCinemasByCityId(this.currentCity.id).subscribe((response:any)=>{
      this.cinemas=this.displayableCinemas= response.cinemas;
      console.log(this.cinemas);
    })
  }

  onChangeSearchCinema(){
    this.searchedCinema= this.searchedCinema.trim();
    if(this.searchedCinema==''){
      this.displayableCinemas=this.cinemas;
    }
    else{  
      this.cinemasService.getCinemasByNameOrAreaAndCityId(this.searchedCinema, this.currentCity.id).subscribe((response:any)=>{
        this.displayableCinemas=response.cinemas;
      })
    }
  }
}
