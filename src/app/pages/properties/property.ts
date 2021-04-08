import {Customer,SelectedCustomer} from '../customers/customer';

export interface Property {
  _id:string,
  owner:Customer,
  name: string,
  type: string,
  contacts?: [
    {
      name:string,
      phone:string
    }
  ],
  location:{
    street: string,
    city: string,
    notes?: string,
    zipcode?: number
  }
  dateAdded?: Date
}

export interface SelectedProperty {
  _id?:string,
  owner?:any,
  name?: string,
  type?: string,
  contacts?: [
    {
      name:string,
      phone:string
    }
  ],
  location?:{
    street?: string,
    city?: string,
    notes?: string,
    zipcode?: number
  }
  dateAdded?: Date
}
