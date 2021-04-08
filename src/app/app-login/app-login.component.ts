import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersApiService} from '../pages/users/usersApi.service'
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {GetRole} from "../store/nav/nav.actions";

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

    role: any;

    constructor(
        private usersApi: UsersApiService,
        private _router: Router,
        private store: Store,
    ) {
    }

    ngOnInit(): void {
    }

    submitLogin() {
        this.usersApi.loginUser(this.loginDetails.value)
            .pipe(first())
            .subscribe(res => {
                if (res['status'] === 'OK') {
                    this.role = localStorage.getItem('role');
                    this.store.dispatch(new GetRole(this.role));
                    if (this.role === 'tech') {
                        this._router.navigate(['add-device'])
                    } else {
                        this._router.navigate([''])
                    }
                }
            })
    }
}
