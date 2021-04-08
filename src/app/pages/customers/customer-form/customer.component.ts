import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SelectedCustomer } from 'src/app/pages/customers/customer';

import { FormOptions } from '../formOptions'
import { CustomerApiService } from '../customerApi.service'

@Component({
  selector: 'customer-form',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit,OnDestroy {
  @Input() customer: SelectedCustomer = {};
  @Input() formOptions: FormOptions = {};
  cusmterAdded:boolean = false;
  custmerEdited:boolean = false;
  internalErr:boolean = false;
  buttonText:string = 'Submit';

  mainForm = new FormGroup({
    _id: new FormControl(),
    customerID: new FormControl('',[Validators.required , Validators.pattern(/^-?([0-9]\d*)?$/) , Validators.minLength(6)]),
    firstName: new FormControl('',[Validators.required , Validators.pattern('^[a-zA-Zא-ת]+$') , Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required , Validators.pattern('^[a-zA-Zא-ת]+$') , Validators.minLength(2)]),
    email: new FormControl('',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('',[Validators.required , Validators.pattern('^((\\+972-?)|0)?[0-9]{10}$')]),
    extraContact: new FormControl('',[Validators.pattern('^[a-zA-Zא-ת]+$')]),
    extraPhone: new FormControl('',[Validators.pattern('^((\\+972-?)|0)?[0-9]{10}$')]),
    street: new FormControl('',[Validators.required , Validators.minLength(5)]),
    city: new FormControl('',[Validators.required , Validators.pattern('.*\\S.*[a-zA-Zא-ת]+$') , Validators.minLength(2)]),
    zipcode: new FormControl('',[Validators.required , Validators.pattern('^[0-9]*$') , Validators.minLength(3)]),
    notes: new FormControl('')
  });
  constructor(
    private CustomerApiService:CustomerApiService
  ) { }

  ngOnInit(): void {
    switch(this.formOptions.action){
      case 'edit':{
        if(this.formOptions.buttonText != undefined){ this.buttonText = this.formOptions.buttonText;}
        this.fillExistingCustomer();
        break;
      }
      case 'add':{
        this.testing1()
        break;
      }
    }
  }

  ngOnDestroy(): void{
    this.customer = {};
    this.formOptions ={};
    this.cusmterAdded = false;
    this.custmerEdited = false;
    this.internalErr = false;
  }

  onSubmit(){
    switch(this.formOptions.action){
      case 'edit':{
        this.CustomerApiService.editCustomer(this.mainForm.value)
          .subscribe(result=>{
            if(result['status'] == 'OK'){
              this.custmerEdited = true;
            }else{
              console.log(result['info']);
            }
          })
          setTimeout(window.location.reload.bind(window.location), 3000);
          break;
      }
      case 'add':{
        this.CustomerApiService.addCustomer(this.mainForm.value)
          .subscribe(result=>{
            if(result['status'] == 'OK'){
              this.cusmterAdded = true
              this.mainForm.reset()
            }
          })
          break;
      }
      default:{
        this.internalErr = true;
      }
    }
  }

  //Sub-functions
  fillExistingCustomer(){
    this.mainForm.get('_id')?.setValue(this.customer._id);
    this.mainForm.get('customerID')?.setValue(this.customer.customerID);
    this.mainForm.get('firstName')?.setValue(this.customer.firstName);
    this.mainForm.get('lastName')?.setValue(this.customer.lastName);
    this.mainForm.get('email')?.setValue(this.customer.email);
    this.mainForm.get('phone')?.setValue(this.customer.phone);
    this.mainForm.get('street')?.setValue(this.customer.location?.street);
    this.mainForm.get('city')?.setValue(this.customer.location?.city);
    this.mainForm.get('zipcode')?.setValue(this.customer.location?.zipcode);
    this.mainForm.get('notes')?.setValue(this.customer.location?.notes);
    if(this.customer.extraContacts != undefined && this.customer.extraContacts[0]){
      this.mainForm.get('extraContact')?.setValue(this.customer.extraContacts?.[0].name);
      this.mainForm.get('extraPhone')?.setValue(this.customer.extraContacts?.[0].phone);
    }
  }
  get customerID(){
    return this.mainForm.get('customerID')?.errors;
  }
  get firstName(){
    return this.mainForm.get('firstName')?.errors;
  }
  get lastName(){
    return this.mainForm.get('lastName')?.errors;
  }
  get email(){
    return this.mainForm.get('email')?.errors;
  }
  get phone(){
    return this.mainForm.get('phone')?.errors;
  }
  get extraContact(){
    return this.mainForm.get('extraContact')?.errors;
  }
  get extraPhone(){
    return this.mainForm.get('extraPhone')?.errors;
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
  //Functions to enalbe/disable the Submit button or show errors
  get formInvalid(){
    return (!this.mainForm.valid);
  }
  formIsValid(){
    return (this.mainForm.valid);
  }
  //Showing the customer added message
  get customerAdded(){
    return this.cusmterAdded;
  }
  get customerEdited(){
    return this.custmerEdited;
  }
  get inErr(){
    return this.internalErr;
  }

  //Here comes the tests...
  //Test only !
  testing1(){
    const id:number = this.randomNumber(10000,9999999999)
    this.mainForm.get('customerID')?.setValue(id)
    this.mainForm.get('firstName')?.setValue('david')
    this.mainForm.get('lastName')?.setValue('tayar')
    this.mainForm.get('email')?.setValue('wow@gmail.com')
    this.mainForm.get('phone')?.setValue('0526371718')
    this.mainForm.get('extraContact')?.setValue('NAme')
    this.mainForm.get('extraPhone')?.setValue('0526321212')
    this.mainForm.get('street')?.setValue('My street is 14')
    this.mainForm.get('city')?.setValue('REhovot')
    this.mainForm.get('zipcode')?.setValue('7654617')
    this.mainForm.get('notes')?.setValue('This is my note so what ?&^$')
  }
  randomNumber(min:number, max:number) { //For testing ONLY !!
    return Math.floor(Math.random() * (max - min) + min);
  }
}
