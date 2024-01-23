import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")])
  });

  formInvalid:boolean=false;

  constructor(private readonly usersService: UsersService, private toastr: ToastrService, private router: Router, private authService: SocialAuthService,private utilityService: UtilityService){}
  
  user: any;
  loggedIn: any;

  ngOnInit(): void {


    this.socialLogin();

  }

  socialLogin(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(user && !localStorage.getItem('token')){
        this.usersService.onGoogleLogin(user).subscribe((response:any)=>{
          this.toastr.success('loggedIn successfully');
          console.log(response);
          this.utilityService.setTokenToLocalStorage(response.token);
          this.utilityService.userToken.next({token: response.token});
          this.utilityService.userDetails.next({user:response.user});
          this.router.navigate(['/']);
        })
      }
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.formInvalid=true;
    }
    else{
      this.usersService.login(this.loginForm.value).subscribe({
        next: (response:any)=>{
          this.toastr.success('loggedIn successfully');
          console.log(response);
          this.utilityService.setTokenToLocalStorage(response.token);
          this.utilityService.userToken.next({token: response.token});
          this.utilityService.userDetails.next({user:response.user});
          this.router.navigate(['/']);
        },
        error: (error)=>{
          if(error.status==401){
            console.log('error is', error);
            this.toastr.error('Invalid Credentials');
          }
        }
      })
    }
  }

}
