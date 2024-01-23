import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CitiesService } from 'src/app/services/cities.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit{

  modalRef:any;
  cities:any[]=[];
  selectedCity:{id: number| null; name: string| null; stateid: number| null}={id: null, name: null, stateid:null };
  token?:string|null;
  user?:any;

  constructor(private modalService: NgbModal, private citiesService: CitiesService, private router: Router, private utilityService: UtilityService, private authService: SocialAuthService, private usersService:UsersService){}

  ngOnInit(): void {
      this.utilityService.city.subscribe(res=>{
        this.selectedCity.id=res.id;
        this.selectedCity.name=res.name;
        this.selectedCity.stateid=res.stateid;
      })

      this.utilityService.userToken.subscribe(res=>{
        this.token=res.token;
      })

      this.utilityService.userDetails.subscribe(res=>{
        if(this.token && !res.user){
          this.usersService.getLoggedInUserDetails().subscribe((response:any)=>{
            this.user=response.user;
            this.utilityService.userDetails.next({user: response.user});
          })
        }
        this.user=res.user;
      })
  }


  ngAfterViewInit(): void {
    if(!this.selectedCity.id){
      this.openModal();
    }
  }

  @ViewChild('content') content!: ElementRef;

  openModal(){
    this.modalRef=this.modalService.open(this.content, {centered: true,scrollable:true, modalDialogClass: 'modal-dialog modal-lg', backdrop:'static'});
    this.citiesService.getAllCities().subscribe((response:any)=>{
      this.cities=response.body.cities;
    })
  }
  closeModal(){
    this.modalRef.close();
  }

  selectCity(city:any){
    this.utilityService.setLocalStorage(city);
    this.utilityService.city.next(city);    
  }

  signOutUser(){
    this.usersService.signOutUser();
  }
  



}
