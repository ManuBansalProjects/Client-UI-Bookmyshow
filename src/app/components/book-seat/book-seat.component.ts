import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.css']
})
export class BookSeatComponent implements OnInit{
  constructor(private cinemaService:CinemasService,private activatedRoute:ActivatedRoute, private moviesService:MoviesService, private usersService:UsersService){}

  screen:any;
  seats:any[]=[];
  movie:any;
  selectedDate?:string;
  selectedTime?:string;

  ngOnInit(): void {
    this.cinemaService.getScreen(this.activatedRoute.snapshot.params['screenId']).subscribe((response:any)=>{
      this.screen=response.screen;
      console.log(this.screen);

      let tempArr:any[]=this.screen?.seats.split(',');
      let rowsCount=0;
      tempArr.forEach((seat:any)=>{
        let tempSeat:any[]=seat.split(' ');
        let rowsArray:any[]=[];
        for(let i=rowsCount+1;i<=rowsCount+Number(tempSeat[1]);i++){
          rowsArray.push(i);
        }
        let colsArray:any[]=[];
        for(let i=1;i<=Number(tempSeat[2]);i++){
          colsArray.push(i);
        }
        this.seats.push({seatType: tempSeat[0], rowsArr: rowsArray, colsArr: colsArray, price: Number(tempSeat[3]) });
        rowsCount+=Number(tempSeat[1]);
      })
    })

    this.moviesService.getMovie(this.activatedRoute.snapshot.params['movieId']).subscribe((response:any)=>{
      this.movie=response.movie;
      console.log(this.movie);
    })

    this.selectedDate=this.activatedRoute.snapshot.params['selectedDate'];
    this.selectedTime=this.activatedRoute.snapshot.params['selectedTime'];
  }

  // @ViewChild('seatBtn') selectedSeat!:ElementRef;
  // this.selectedSeat.nativeElement.style.backgroundColor='green';
  bookedColor:string='rgb(69, 163, 46)';
  totalPrice:number=0;

  onSelectSeat(event:any,price:number){
    if(event.target.style.backgroundColor==this.bookedColor){
      event.target.style.backgroundColor='';
      event.target.style.color='';
      this.totalPrice-=price;
    }
    else{
      event.target.style.backgroundColor=this.bookedColor;
      event.target.style.color='white';
      this.totalPrice+=price;
    }
  }

  checkUserLoggedIn(){
    this.usersService.verifyJwt().subscribe((response:any)=>{
      console.log(response);
      
    })
  }
}
