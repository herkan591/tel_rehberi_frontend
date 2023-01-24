import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { AlertifyService } from './services/alertify.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private alertifyService:AlertifyService,private accountService:AccountService,private router:Router) {}
  
  handleError(error: HttpErrorResponse) {


    if(error.status==401){

      this.accountService.logOut();
      

    }else{
      this.alertifyService.error(error.message);
    }


    
  }
  

}