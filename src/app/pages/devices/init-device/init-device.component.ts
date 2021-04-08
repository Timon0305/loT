import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';

import { PropertiesApiService } from '../../properties/propertyApi.service';
import { CustomerApiService } from '../../customers/customerApi.service';
import { DeviceApiService } from '../devicesApi.service';
import { Property, SelectedProperty } from '../../properties/property';
import { SelectedCustomer } from '../../customers/customer';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'init-device',
  templateUrl: './init-device.component.html',
  styleUrls: ['./init-device.component.scss']
})
export class InitDeviceComponent implements OnInit {
  filteredOptions!: Observable<any>;
  propertyList:Property[] = [];
  property:SelectedProperty = {};
  customer:SelectedCustomer = {};
  isSimInit:boolean = false;
  isSimErr:boolean = false;
  selectedProperty = new FormControl({
    value:'',
    disabled:true,
  },[Validators.required]);
  simNumber = new FormControl('',[Validators.required,Validators.pattern('^((\\+972-?)|0)?[0-9]{9}$')]);

  showLoading:boolean = false

  constructor(
    private customerApi:CustomerApiService,
    private propertyApi:PropertiesApiService,
    private deviceApi:DeviceApiService,
    ) { }

  ngOnInit(): void {
    this.propertyApi.getAllProperties()
    .subscribe(result=>{
      //TODO: check for error !! //Dev
      const properties = result.data as Property[];
      properties.forEach(thisProperty=>{
        this.propertyList.push(thisProperty);
      })
      this.selectedProperty.enable();
    })

    this.filteredOptions = this.selectedProperty.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: any): any {
    return this.propertyList.filter(option => option.name.includes(value));
  }

  setProperty(newProperty:SelectedProperty){
    this.property = newProperty;
    if(this.property.owner){
      this.customerApi.getCustomer(this.property.owner)
      .subscribe(result=>{
        if(result.status == 'OK'){
          this.customer = result.data;
        }
      })
    }
  }

  initSim(){
    this.showLoading = true;
    const deviceDetails = {
      simNumber: this.simNumber.value,
      property: this.property,
      customer: this.customer
    }
    this.simNumber.disable();

    this.deviceApi.initPanel(deviceDetails)
    .subscribe(result=>{
      if(result.status == 'OK'){
        this.isSimInit = true;
      }else{
        this.isSimErr = true;
        console.log(result);
      }
      this.showLoading = false;
    })
  }

  //Valid additonal helpers
  get simNumStatus(){
    return this.simNumber.errors;
  }
}
