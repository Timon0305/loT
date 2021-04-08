import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subscription, timer } from 'rxjs';

import { AppConfig } from '../app.config.service';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';

export interface QuickAlert{
  origin:string,
  kind:string,
  zone:number,
  status:string
}

@Component({
  selector: 'app-toastr',
  templateUrl: './app-toastr.component.html',
  styleUrls: ['./app-toastr.component.scss']
})

@Injectable({providedIn:'root'})
export class AppToastrComponent implements OnInit {
  private baseURL: string = AppConfig.Settings.baseURL;
  private newAlertsPath:string = 'new-alerts';
  private subscription?:Subscription;
  alertsFound:QuickAlert[]=[];

  constructor(
    private toastr: ToastrService,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.checkNewAlert()
  }
  createUpdateCheck = timer(0,5000).pipe(
    switchMap((test)=>
    this.http.get<any>(this.baseURL+this.newAlertsPath).pipe(
      retry(3),
      catchError(()=>{
        this.serviceManager('ERR')
        return EMPTY;
      })
    )
    ),
    tap((result)=>{
      this.serviceManager(result)
    })
  )

  private checkNewAlert(){
    this.subscription = this.createUpdateCheck.subscribe();
  }

  private serviceManager(result:any){
    if(result.status == 'OK'){
      if(result.alarm){
        const newAlert = result.alarm as QuickAlert;
        this.showDanger(newAlert);
        this.alertsFound.push(newAlert);
      }
    }else{
      this.showWarning('Network Error','Cant reach server')
      this.subscription?.unsubscribe();
    }
  }

  showDanger(newAlert:QuickAlert){
    this.toastr.error(`From sim number: ${newAlert.origin}`,`${newAlert.kind.toUpperCase()} ALERT`,{timeOut:60000})
  }

  showWarning(title:string,content:string){
    this.toastr.warning(content,title)
  }
}
