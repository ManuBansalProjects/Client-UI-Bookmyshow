import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class UserAuthenticatedGuard{

  constructor(private usersService: UsersService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return  localStorage.getItem('token') ? true : false;    
  }
  
}
