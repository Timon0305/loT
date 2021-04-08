import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { AppConfig } from '../../app.config.service';
import {map} from "rxjs/operators";
import {User} from "../../../core/model/user.model";

@Injectable({providedIn:'root'})
export class UsersApiService {
  baseURL: string = AppConfig.Settings.baseURL;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
      this.currentUser = this.currentUserSubject.asObservable();
  }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  addCustomer(userDetails:any): Observable<any> {
    const addUserPath = `new-user`;
    return this.http.post(this.baseURL+addUserPath,userDetails);
  }

  getRoles():Observable<any>{
    const getRolesPath = `user-roles`;
    return this.http.get(this.baseURL+getRolesPath);
  }

  loginUser(userDetails:any):Observable<any>{
    const loginPath = `login`;
    return this.http.post(this.baseURL+loginPath, userDetails)
        .pipe(map((res: any) => {
            if(res['status'] == 'OK'){
                localStorage.setItem('token',res.token);
                this.currentUserSubject.next(res['token']);
            }
            return res;
        }))

  }
}
