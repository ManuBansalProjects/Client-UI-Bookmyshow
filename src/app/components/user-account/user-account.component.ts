import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{

  userForm=new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  })

  constructor(private utilityService: UtilityService, private router:Router, private toastr:ToastrService, private usersService:UsersService){ }

  user:any;

  ngOnInit(): void {
    this.utilityService.userDetails.subscribe(res=>{
      this.user=res.user;
      console.log(this.user);

      this.userForm=new FormGroup({
        name: new FormControl(this.user?.name, [Validators.required, Validators.minLength(3)]),
        email: new FormControl({value: this.user?.email, disabled: true}, [Validators.required, Validators.email])
      })
    })
  }

  onSubmit(){
    console.log(this.userForm.value);
    this.usersService.updateUser(this.userForm.value).subscribe((response:any)=>{
      console.log(response);
      this.toastr.success('updated successfully');
    })
  }


}
