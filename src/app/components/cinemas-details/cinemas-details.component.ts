import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';

@Component({
  selector: 'app-cinemas-details',
  templateUrl: './cinemas-details.component.html',
  styleUrls: ['./cinemas-details.component.css']
})
export class CinemasDetailsComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private cinemasService: CinemasService){}

  cinemaId:any;
  cinema:any;
  dates:any[]=['12 june','13 june','14 june'];

  selectedDate=new FormControl('');

  ngOnInit(): void {
    this.cinemaId=this.activatedRoute.snapshot.params['cinemaId'];

    this.cinemasService.getCinema(this.cinemaId).subscribe((response:any)=>{
      this.cinema=response.cinema;
      console.log(this.cinema);
    })
  }

  changeDate(event:any){
    console.log(event.target.value);
  }
}
