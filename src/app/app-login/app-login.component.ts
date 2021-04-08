import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {UsersApiService} from '../pages/users/usersApi.service'
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  loginDetails = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private usersApi:UsersApiService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  submitLogin(){
    this.usersApi.loginUser(this.loginDetails.value)
        .pipe(first())
        .subscribe(res => {
          if (res['status'] === 'OK') {
            console.log('okay')
            this._router.navigate([''])
          }
        })
  }
}
