import { Component, OnInit, OnDestroy,Input } from '@angular/core';

import { FormOptions } from '../formOptions';

@Component({
  selector: 'new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit {
  formOptions:FormOptions = {
    buttonText:'Add Property',
    action:'add',
    existing:false
  }

  constructor() { }

  ngOnInit(): void {
  }

}
