import { Injectable } from '@angular/core';
import { Config } from '../assets/config/config';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';


@Injectable({
providedIn: 'root'
})
export class AppConfig {

static Settings: Config;
private http: HttpClient;
constructor(private httpBackEnd: HttpBackend) {
    this.http = new HttpClient(httpBackEnd);
}
load() {
    const jsonFile = 'assets/config/deploy.json';
    return new Promise<void>((resolve, reject) => {
    this.http.get(jsonFile).toPromise().then(response => {
       AppConfig.Settings = <Config>response;
       resolve();
    }).catch((response: any) => {
       reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
    });
    });
 }
}
