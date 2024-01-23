import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm=new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")]),
    confirmpassword: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")])
  });

  formInvalid:boolean=false;

  constructor(private usersService: UsersService, private router: Router, private toastr:ToastrService,private authService: SocialAuthService){}
  
  user: any;
  loggedIn: any;

  ngOnInit(): void {
    this.socialLogin();
  }

  socialLogin(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.usersService.onGoogleLogin(user).subscribe((response:any)=>{
          this.toastr.success('loggedIn successfully');
          this.router.navigate(['/']);
          console.log(response);
      })
    });
  }

  
  onSubmit(){
    if(this.registerForm.invalid){
      this.formInvalid=true;
    }
    else{
      this.usersService.registration(this.registerForm.value).subscribe({
        next: (response:any)=>{
          console.log(response);
          this.router.navigate(['/login']);
          this.toastr.success('Successfully Registered');
        },
        error: (error)=>{
          if(error.status==400){
            console.log('error is', error);
            this.toastr.error('Already Registered');
          }
        }
      })

    }
  }

}
