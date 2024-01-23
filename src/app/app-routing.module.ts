import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { ExploreCinemasComponent } from './components/explore-cinemas/explore-cinemas.component';
import { CinemasDetailsComponent } from './components/cinemas-details/cinemas-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { ExploreMovieComponent } from './components/explore-movie/explore-movie.component';
import { BookShowComponent } from './components/book-show/book-show.component';
import { BookSeatComponent } from './components/book-seat/book-seat.component';
import { ParentComponent } from './components/parent/parent.component';


const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'parent', component: ParentComponent},
  {path:'explore/movies', component: AllMoviesComponent},
  {path:'explore/movie/:movieId', component: ExploreMovieComponent},
  {path:'book-show/:movieId', component: BookShowComponent},
  {path:'book-seat/:movieId/:screenId/:selectedDate/:selectedTime', component: BookSeatComponent},
  {path:'explore/upcoming-movies', component: UpcomingMoviesComponent},
  {path:'explore/cinemas', component: ExploreCinemasComponent},
  {path:'explore/cinema/:cinemaId', component: CinemasDetailsComponent},
  {path:'register', component:RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:jwtToken', component: ResetPasswordComponent},
  {path: 'user-account', component: UserAccountComponent, canActivate:[UserAuthenticatedGuard]},
  {path: 'change-password', component: ResetPasswordComponent, canActivate:[UserAuthenticatedGuard]},
  {path:'**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[UserAuthenticatedGuard]
})
export class AppRoutingModule { }

