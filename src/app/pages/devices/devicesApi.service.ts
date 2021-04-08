import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config.service'

@Injectable({providedIn:'root'})
export class DeviceApiService {
  baseURL: string = AppConfig.Settings.baseURL;

  constructor(private http: HttpClient) {
  }

  //Will sent initialize command, and then set default number
  initPanel(details:any):Observable<any>{
    const initPath = 'init-panel';
    return this.http.post(this.baseURL + initPath,details);
  }
  deviceList():Observable<any>{
    const initPath = 'device-list';
    return this.http.get(this.baseURL + initPath);
  }
  getDevice(device:any):Observable<any>{
    const initPath = 'get-device';
    return this.http.post(this.baseURL + initPath,device);
  }
  getDeviceTypes():Observable<any>{
    const initPath = 'device-types';
    return this.http.get(this.baseURL + initPath);
  }
  updateDevices(summary:any):Observable<any>{
    const initPath = 'update-devices';
    return this.http.put(this.baseURL + initPath,summary);
  }
}
