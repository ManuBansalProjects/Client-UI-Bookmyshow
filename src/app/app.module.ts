import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { ExploreCinemasComponent } from './components/explore-cinemas/explore-cinemas.component';
import { CinemasDetailsComponent } from './components/cinemas-details/cinemas-details.component';
import {  GoogleLoginProvider, FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ExploreMovieComponent } from './components/explore-movie/explore-movie.component';
import { BookShowComponent } from './components/book-show/book-show.component';
import { BookSeatComponent } from './components/book-seat/book-seat.component';
import { ButtonComponent } from './components/button/button.component';
import { ParentComponent } from './components/parent/parent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    AllMoviesComponent,
    RegisterComponent,
    LoginComponent,
    UpcomingMoviesComponent,
    ExploreCinemasComponent,
    CinemasDetailsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NoPageComponent,
    UserAccountComponent,
    ExploreMovieComponent,
    BookShowComponent,
    BookSeatComponent,
    ButtonComponent,
    ParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1063130776867-hghapoa8hdb56sfnrnqe96dild20kk9a.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1063130776867-hghapoa8hdb56sfnrnqe96dild20kk9a.apps.googleusercontent.com')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
