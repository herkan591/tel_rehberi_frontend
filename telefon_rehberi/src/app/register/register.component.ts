import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { USE_DEFAULT_LANG } from '@ngx-translate/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService:AccountService,private alertifyService:AlertifyService) { }

  model:User=new User();

  ngOnInit() {
  }

  register(userRegisterForm:NgForm){

    this.accountService.register(this.model).subscribe(data=>{
      this.alertifyService.success(this.model.email+" kaydedildi.");
    });

  }


}
