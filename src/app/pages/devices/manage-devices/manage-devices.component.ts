import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Device } from '../device';
import { map, startWith } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DeviceApiService } from '../devicesApi.service';

@Component({
  selector: 'app-manage-devices',
  templateUrl: './manage-devices.component.html',
  styleUrls: ['./manage-devices.component.scss']
})
export class ManageDevicesComponent implements OnInit {
  //Device find variables
  filteredOptions!: Observable<any>;
  showLoading:boolean = false;
  panelList:Device[] = [];
  currentDevice?:Device;
  selectedDevice = new FormControl({
    value:'',
    disabled:true,
  },[Validators.required]);
  errorManager = {
    isErr:false,
    errInfo:''
  }
  closeResult = '';

  //Dynamic form variables
  dynamicForm: FormGroup;
  submitted = false;
  deviceTypes:any[] = [];
  deviceCount:number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private devicesApi:DeviceApiService,
    private modalService: NgbModal
  ) {
    this.dynamicForm = this.formBuilder.group({
      devices: new FormArray([])
  });
   }

  ngOnInit(): void {
    this.showLoading = true;

    const request = this.devicesApi.deviceList()
    .subscribe(result=>{
      if(result.status == 'OK'){
        //Put all devices in array
        const devices = result.data as Device[];
        devices.forEach(device=>{
          this.panelList.push(device);
        })
        //Enable the input
        this.selectedDevice.enable();
      }else{
        this.errorManager.isErr = true;
        this.errorManager.errInfo = result.info;
      }
      this.showLoading = false;
    });

    //If server not working ? wait 10 seconds for response, else report error !
    setTimeout(() => {
      if(this.panelList.length<1){
        request.unsubscribe();
        this.errorManager.isErr = true;
        this.errorManager.errInfo = 'Loading was failed, no reply from server or no devices was found';
        this.showLoading = false;
      }
    }, 10000);

    this.filteredOptions = this.selectedDevice.valueChanges
      .pipe(
        startWith(''),
        map(value=>this._filter(value))
      );
    //Fill devices types for dropdown menu
    this.findDeviceTypes();
  }
  private _filter(value: any): any {
    return this.panelList.filter(option => option.simNumber.includes(value));
  }

  //Apply via click
  setDevice(device:Device){
    this.showLoading = true;
    this.devicesApi.getDevice(device)
      .subscribe(result=>{
        if(result.status == 'OK'){
          this.currentDevice = result.data;
        } else {
          this.errorManager.isErr = true;
          this.errorManager.errInfo = result.info;
        }
        this.showLoading = false;
      })
  }

  //Wait for changes +- or range picker
  onChangeDevices() {
    const numberOfDevices = this.deviceCount;
    if (this.t.length < numberOfDevices) {
        for (let i = this.t.length; i < numberOfDevices; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                zone: ['', Validators.required],
                deviceType: ['', Validators.required]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfDevices; i--) {
            this.t.removeAt(i);
        }
    }
  }
  addOneDevice(){
    this.deviceCount++;
    this.onChangeDevices();
  }
  removeOneDevice(){
    if(this.deviceCount>0){
      this.deviceCount--;
    }
    this.onChangeDevices();
  }

  //Update the dynamic form 'selector'
  findDeviceTypes(){
    this.devicesApi.getDeviceTypes()
      .subscribe(result=>{
        const newTypes = result as string[];
        newTypes.forEach(thisType=>{
          this.deviceTypes.push(thisType);
        })
      })
  }

  //On form submit
  submit(){
    const summary = {
      currentDevice: this.currentDevice,
      numberOfDevices: this.deviceCount,
      deviceList: this.dynamicForm.value.devices
      }
    this.devicesApi.updateDevices(summary)
      .subscribe(result=>{
        if(result.status == 'OK'){
          this.submitted = true;
        }else{
          this.errorManager.isErr=true;
          this.errorManager.errInfo="Send update was failed";
        }
        this.modalService.dismissAll();
      })
  }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.devices as FormArray; }
  get deviceFormGroups() { return this.t.controls as FormGroup[]; }

  //Modal
  reviewDeviceModal(reviewDevice:any) {
    //First send error if it's  not complete, else start sending
    switch(true){
      case (!this.dynamicForm.valid):{
        this.errorManager.errInfo = "Please complete all fields";
        this.errorManager.isErr = true;
        return;
      }
      case(!this.currentDevice):{
        this.errorManager.errInfo = "You need to select device";
        this.errorManager.isErr = true;
        return;
      }
      default:{
        this.errorManager.isErr = false;
      }
    }

    this.currentDevice!.devices = this.dynamicForm.value.devices;

    this.modalService.open(reviewDevice, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
