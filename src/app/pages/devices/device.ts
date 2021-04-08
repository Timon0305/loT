import { Customer } from '../customers/customer';
import { Property } from '../properties/property';

export interface Device {
  _id:string,
  property:Property,
  customer:Customer,
  simNumber:String,
  initStatus:Boolean,
  initNumbers:[String],
  init_date:Date,
  devices:[{
    name:String,
    deviceType:[String],
    zone:Number
  }]
}
export interface RemoteDevice {
  _id:string,
  property:Property,
  customer:Customer,
  simNumber:String,
  initStatus:Boolean,
  initNumbers:[String],
  init_date:Date,
  devices:{
    [dynamic:number]:{
      name:String,
      deviceType:String,
      zone:Number
    }
  },
  deviceCount:number
}


