import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService,private router: Router) { }

  model:User=new User();

  ngOnInit() {
  }

  login(form:NgForm){
    
    this.accountService.login(this.model).subscribe(data=>{

      this.router.navigateByUrl(this.accountService.getNextRoute());

    });


  }

  register(){
    
    this.router.navigateByUrl('/register');

  }





}
