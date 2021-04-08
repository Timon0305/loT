import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from './customer';
import { AppConfig } from '../../app.config.service';

@Injectable({providedIn:'root'})
export class CustomerApiService {
  baseURL: string = AppConfig.Settings.baseURL;

  constructor(private http: HttpClient) {
  }

  addCustomer(customer:Customer): Observable<any> {
    const addCustomerPath = `new-customer`
    return this.http.post(this.baseURL+addCustomerPath,customer);
  }

  editCustomer(customer:Customer): Observable<any>{
    const editCustomerPath = `modify-customer`
    return this.http.put(this.baseURL+editCustomerPath,customer);
  }

  deleteCustomer(customerID?:string):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        _id: customerID,
      },
    };
    const deleteCustomerPath = `remove-customer`
    return this.http.delete(this.baseURL+deleteCustomerPath,options);
  }

  getAllCustomers(): Observable<any>{
    const getAllCustomersPath = `all-customers`
    return this.http.get(this.baseURL+getAllCustomersPath);
  }

  getCustomer(customerID:string): Observable<any>{
    const options = {
      _id: customerID,
    };

    const getCustomerPath = `get-customer`
    return this.http.post(this.baseURL+getCustomerPath,options)

  }

}
