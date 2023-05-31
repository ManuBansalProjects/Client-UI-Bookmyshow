import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CitiesService } from 'src/app/services/cities.service';
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

  constructor(private modalService: NgbModal, private citiesService: CitiesService, private router: Router, private utilityService: UtilityService){}

  ngOnInit(): void {
      this.utilityService.city.subscribe(res=>{
        this.selectedCity.id=res.id;
        this.selectedCity.name=res.name;
        this.selectedCity.stateid=res.stateid;
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
      this.cities=response.cities;
    })
  }

  closeModal(){
    this.modalRef.close();
  }

  selectCity(city:any){
    this.utilityService.setLocalStorage(city);
    this.utilityService.city.next(city);
  }



}
