import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UtilityService } from '../services/utility.service';
import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private utilityService: UtilityService, private usersService:UsersService, private router:Router, private toastr:ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){    
        // console.log(req.url);
        // if(req.url==''){
        //     return next.handle(req);        
        // }    
        // return next.handle(req);
        

        // let modifiedReq=req.clone({
        //     headers: req.headers.append('auth','abc'),
        //     setHeaders:{
        //         auth: 'abc',
        //         token: 'mytoken'
        //     },
        //     url: 'mefefeafgthts',
        //     params: req.params.append('hai', 'hello world'),
        //     setParams:{
        //         name: 'manu',
        //         ag: '22'
        //     }
        // })
        // return next.handle(req).pipe(tap (event=>{
        //     this.utilityService.loader.next(true);
        //     console.log(event);
        //     if(event.type === HttpEventType.Response){
        //         if(event.status==200){
        //             this.utilityService.loader.next(false);
        //         }
        //     }
        // }))

        // return next.handle(req).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //           console.log('event--->>>', event);
        //         }
        //         return event;
        //     }),
        //     // catchError(err => {
        //     //     if (err instanceof HttpErrorResponse) {
        //     //         if (err.status === 401) {
        //     //             console.log('this should print your error!', err.error);
        //     //         }
        //     //     }
        //     // })
        //     // catchError(err)
        // )

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((err) => {
                if (err instanceof ErrorEvent) {
                  console.log('this is an error in the code');
                } else {
                  console.log('this is an error return by the server');
                  if(err.status==401){
                    this.usersService.signOutUser();
                    this.toastr.error('Session Expired');
                  }
                }
                return throwError(() => err);
            })
        );

    }
}