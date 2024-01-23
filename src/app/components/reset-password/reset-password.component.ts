import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  constructor(private usersService:UsersService, private activatedRoute:ActivatedRoute, private toastr:ToastrService, private router:Router){ }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['jwtToken']){
      this.isCurrentUrlValid();
    }
  }

  isCurrentUrlValid(){
    let jwtToken=this.activatedRoute.snapshot.params['jwtToken'];
    this.usersService.isResetPasswordLinkValid(jwtToken).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(error)=>{
        this.toastr.error('link has expired');
        this.router.navigate(['/login']);
      }
    })
  }

  resetForm=new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')])
  })

  isInvalid:boolean=false;

  onSubmit(){
    if(this.resetForm.invalid){
      this.isInvalid=true;
    }
    else if(this.activatedRoute.snapshot.params['jwtToken']){
      let jwtToken=this.activatedRoute.snapshot.params['jwtToken'];
      this.usersService.resetPassword(this.resetForm.value.password, jwtToken).subscribe({
        next:(response)=>{
          this.toastr.success('password updated successsfully');
          this.router.navigate(['/login']);
        }
      })
    }
    else{
      this.usersService.changePassword(String(this.resetForm.value.password)).subscribe({
        next:(response)=>{
          this.toastr.success('password updated successsfully');
          this.router.navigate(['/user-account']);
        }
      })
    }
  }
}
