import { Component, OnInit } from '@angular/core';

import { FormOptions } from '../formOptions';

@Component({
  selector: 'new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  cusmterAdded:boolean = false;
  customerFormOptions:FormOptions = {
    buttonText:'Add',
    existing:false,
    action:'add'
  }

  constructor() {}

  ngOnInit(): void {}

}
