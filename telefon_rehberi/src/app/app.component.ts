
import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './services/account.service';


@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
})
export class AppComponent {
    
    constructor(public translateService: TranslateService,private accountService:AccountService){

    }
    isLoggedin():boolean{
        return this.accountService.isLoggedIn();
    }
    
      logOut(){
    
        this.accountService.logOut();
      }
  
}