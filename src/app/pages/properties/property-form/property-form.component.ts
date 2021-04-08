import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { CustomerApiService } from '../../customers/customerApi.service';
import { PropertiesApiService } from '../propertyApi.service';
import { FormOptions } from '../formOptions';
import { Customer } from '../../customers/customer'
import { SelectedProperty } from '../property';

@Component({
  selector: 'property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  @Input() property:SelectedProperty = {};
  @Input() formOptions:FormOptions = {};
  showCustomer:boolean = true;
  owner = new FormControl({
    value:'',
    disabled:true //Wait until all customers will be updated
  },[Validators.required]);
  customersList:Customer[] = [];
  filteredOptions!: Observable<any>;
  loadingCustomers:boolean = true;
  customerLocation:boolean = false;
  customerPhone:boolean = false;
  buttonText:string = 'Submit';
  propertyAdded:boolean = false;
  internalErr:boolean = false;

  mainForm = new FormGroup({
    _id: new FormControl(),
    owner: new FormControl(), //only for 'add' mode to sent with owner
    name: new FormControl('',[Validators.required , Validators.minLength(3)]),
    contactName: new FormControl('', Validators.minLength(2)),
    contactPhone: new FormControl('',[Validators.pattern('^((\\+972-?)|0)?[0-9]{10}$') , Validators.minLength(7)]),
    type: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required , Validators.minLength(5)]),
    city: new FormControl('',[Validators.required , Validators.pattern('.*\\S.*[a-zA-Zא-ת]+$') , Validators.minLength(2)]),
    zipcode: new FormControl('',[Validators.required , Validators.pattern('^[0-9]*$') , Validators.minLength(3)]),
    notes: new FormControl()
  });

  constructor(
    private customerApi:CustomerApiService,
    private propertyApi:PropertiesApiService
  ) { }

  //TODO: Disable customer selection
  ngOnInit(): void {
    //Get customers to autocomplete
    this.customerApi.getAllCustomers().subscribe(result=>{
      const customers = result.data as Customer[];
      customers.forEach(customer =>{
        this.customersList.push(customer)
      })
      this.owner.enable() //Enable customer input
    })
    //start auto complete to customer
    this.filteredOptions = this.owner.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    //customize button text
    switch(this.formOptions.action){
      case 'add':{
        if(this.formOptions.buttonText) this.buttonText = this.formOptions.buttonText;
        this.showCustomer = true;
        break;
      }
      case 'edit':{
        if(this.formOptions.buttonText) this.buttonText = this.formOptions.buttonText;
        this.showCustomer = false;
        this.fillUpDetails()
        break;
      }
    }
  }
  private _filter(value: any): any {
    return this.customersList.filter(option => option.phone.includes(value));
  }

  //Send the form
  onSubmit(){
    switch(this.formOptions.action){
      case 'add':{
        this.propertyApi.addProperty(this.mainForm.value).subscribe(result=>{
          if(result.status == 'OK'){
            this.propertyAdded = true;
            this.mainForm.reset();
            this.owner.reset();
          }
          else{
            console.log(result);
          }
        })
        break;
      }
      case 'edit':{
        this.propertyApi.editProperty(this.mainForm.value)
        .subscribe(result=>{
          if(result.status =='OK'){
            console.log('OK');
          }
        })
        break;
      }
    }

  }

  //Additonal to set and view other details
  setCustomer(customer:any){
    this.mainForm.get('owner')?.setValue(customer);
  }

  //Automatic customer location
  useCustomerLocation():void{
    const locationObj:string[] = ['street','city','zipcode','notes'];
    const selectedCustomer = this.mainForm.get('owner')?.value as Customer;

    if(this.customerLocation){
      this.customerLocation= false

      locationObj.forEach(obj=>{
        this.mainForm.get(obj)?.enable();
        this.mainForm.get(obj)?.reset();
      })

    }
    else {
      this.customerLocation = true
      if(selectedCustomer){
        this.mainForm.get('street')?.setValue(selectedCustomer.location.street);
        this.mainForm.get('notes')?.setValue(selectedCustomer.location.notes);
        this.mainForm.get('city')?.setValue(selectedCustomer.location.city);
        this.mainForm.get('zipcode')?.setValue(selectedCustomer.location.zipcode);
      }
    }
  }

  useCustomerPhone():void{
    const selectedCustomer = this.mainForm.get('owner')?.value as Customer;

    if(this.customerPhone){
      this.customerPhone = false;
      this.mainForm.get('contactName')?.reset()
      this.mainForm.get('contactPhone')?.reset()
    }
    else{
      this.customerPhone = true;
      if(selectedCustomer){
        this.mainForm.get('contactName')?.setValue(selectedCustomer.firstName)
        this.mainForm.get('contactPhone')?.setValue(selectedCustomer.phone)
      }
    }
  }

  //Only in 'edit' mode
  fillUpDetails(){
    if(this.property){
      if(this.property.owner){
        this.customerApi.getCustomer(this.property.owner)
        .subscribe(result=>{
          if(result.status == 'OK'){
            const tempCustomer:Customer = result.data;
            this.owner.setValue(tempCustomer.firstName+' '+tempCustomer.lastName);
          }
        })
      }else{
        console.log("No ID provided");
      }

      this.mainForm.get('_id')?.setValue(this.property._id);
      this.mainForm.get('name')?.setValue(this.property.name);
      this.mainForm.get('type')?.setValue(this.property.type);
      this.mainForm.get('street')?.setValue(this.property.location?.street);
      this.mainForm.get('city')?.setValue(this.property.location?.city);
      this.mainForm.get('zipcode')?.setValue(this.property.location?.zipcode);
      this.mainForm.get('notes')?.setValue(this.property.location?.notes);
      this.mainForm.get('contactName')?.setValue(this.property.contacts?.[0].name);
      this.mainForm.get('contactPhone')?.setValue(this.property.contacts?.[0].phone);
    }
  }

  //getters for input validation
  get name(){
    return this.mainForm.get('name')?.errors;
  }
  get type(){
    return this.mainForm.get('type')?.errors;
  }
  get street(){
    return this.mainForm.get('street')?.errors;
  }
  get city(){
    return this.mainForm.get('city')?.errors;
  }
  get zipcode(){
    return this.mainForm.get('zipcode')?.errors;
  }
  get contactName(){
    return this.mainForm.get('contactName')?.errors;
  }
  get contactPhone(){
    return this.mainForm.get('contactPhone')?.errors;
  }

  get isPropertyAdded(){
    return this.propertyAdded;
  }
  get inErr(){
    return this.internalErr;
  }
  get formInvalid(){
    return (!this.mainForm.valid);
  }
  formIsValid(){
    return (this.mainForm.valid);
  }

}
