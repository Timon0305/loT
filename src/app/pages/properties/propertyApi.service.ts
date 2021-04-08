import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app.config.service';
import { Property } from'./property';

@Injectable({providedIn:'root'})
export class PropertiesApiService {
  baseURL: string = AppConfig.Settings.baseURL;

  constructor(private http: HttpClient) {
  }

  addProperty(property: Property): Observable<any>{
    const addPropertyPath = 'new-property';
    return this.http.post(this.baseURL+addPropertyPath,property);
  }

  editProperty(property:Property):Observable<any>{
    const editProperty = 'edit-property'
    return this.http.post(this.baseURL+editProperty,property);
  }

  deleteProperty(propertyID?: string): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        _id: propertyID,
      },
    };
    const deletePropertyPath = `delete-property`
    return this.http.delete(this.baseURL+deletePropertyPath,options);
  }

  getAllProperties(): Observable<any>{
    const getAllPath = 'all-properties';
    return this.http.get(this.baseURL+getAllPath);
  }
}
