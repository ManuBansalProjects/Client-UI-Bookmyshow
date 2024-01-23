import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  myForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  formInvalid?:boolean=false;

  constructor(private usersService: UsersService, private toastr: ToastrService){}

  onSubmit(){
    if(this.myForm.invalid){
      this.formInvalid=true;
    }
    else{
      this.usersService.forgotPassword(this.myForm.value).subscribe({
        next: (response:any)=>{
          console.log(response);
          this.toastr.success(response.message);
        },
        error: (error)=>{
          console.log(error);
          this.toastr.error('no email found');
        }
      })
    }
  }
}
