import {RemoteDevice} from '../devices/device'
export interface Alert{
  _id:string,
  kind:string,
  zone:number,
  locationName?:string,
  origin:string,
  timestamp:Date,
  fatherPanel?:RemoteDevice,
  status:string
}
