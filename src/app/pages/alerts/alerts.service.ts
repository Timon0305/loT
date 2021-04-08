import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app.config.service';

class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Injectable({providedIn:'root'})
export class AlertsApiService {
  private baseURL: string = AppConfig.Settings.baseURL;

  constructor(private http: HttpClient) {
  }

  getAlerts(dtParameters:any):Observable<DataTablesResponse>{
    const alertsTablePath = 'alerts-to-table'
    return this.http.post(this.baseURL+alertsTablePath,dtParameters)
  }

  getStatusOpt():Observable<any>{
    const statusPath = 'status-options';
    return this.http.get(this.baseURL + statusPath);
  }

  changeStatus(alertIdTChange:string,newStatus:string,userComment?:string):Observable<any>{
    const statusUpdatePath = 'change-status';
    const statusObject ={
      alertID:alertIdTChange,
      status:newStatus,
      comment:userComment
    }

    return this.http.post(this.baseURL + statusUpdatePath, statusObject);
  }

}
