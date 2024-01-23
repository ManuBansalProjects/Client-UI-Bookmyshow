import { Component, OnInit } from '@angular/core';
import { UtilityService } from './services/utility.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  loader:any;

  constructor(private utilityService: UtilityService){}

  ngOnInit(): void { }

}
