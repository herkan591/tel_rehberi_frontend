import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { MyToken } from '../models/mytoken';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
@Injectable()
export class AccountService {

  constructor(private httpClient:HttpClient,private alertifyService:AlertifyService,
    private router: Router) { 

      localStorage.setItem("authPath","https://localhost:44365/api/auth");
    }

  loggedIn=false;

  path="https://localhost:44365/api/auth";


  nextRoute="";


  

  login(user:User):Observable<MyToken>{

    console.log("Kulanıcı adı : "+user.name);

  
    return this.httpClient.post<MyToken>(this.path+"/login",user).pipe(
      tap(data=>{
        console.log(JSON.stringify(data));


        localStorage.setItem("accessToken",(data["accessToken"]));
        //localStorage.setItem("refreshToken",(data["refreshToken"]));

        this.loggedIn=true;

        this.alertifyService.success("Giriş başarılı");

      })
    );

  }

  getNextRoute():string{
    return this.nextRoute;
  }
  setNextRoute(route:string){
    this.nextRoute=route;
  }

  isLoggedIn(){

    return this.loggedIn;

  }

  logOut(){

    this.loggedIn=false;
    localStorage.clear();
    window.location.reload();

  }


  register(user:User):Observable<User>{

    console.log("Kulanıcı adı : "+user.name);
 
  
    return this.httpClient.post<User>(this.path+"/register",user).pipe(
      tap(data=>console.log(JSON.stringify(data)))
    );
  }
  /*refreshTokenLogin():Observable<MyToken>{

   

    return this.httpClient.post<MyToken>(this.path+"/RefreshTokenLogin",localStorage.getItem("refreshToken")).pipe(
      tap(data=>{
        localStorage.setItem("accessToken",(data["accessToken"]));
        localStorage.setItem("refreshToken",(data["refreshToken"]));

        this.loggedIn=true;

      })
    );
  }*/

  


}
