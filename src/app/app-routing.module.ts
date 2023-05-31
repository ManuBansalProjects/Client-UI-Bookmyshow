import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';


const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'explore/movies', component: AllMoviesComponent},
  {path:'**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
