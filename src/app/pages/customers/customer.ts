export interface Customer {
  _id:string,
  customerID: number,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  extraContacts?: [
    {
      name:string,
      phone:string
    }
  ],
  location:{
    street: string,
    city: string,
    notes?: string,
    zipcode: number
  }
  dateJoin?: Date
}

export interface SelectedCustomer {
  _id?:string,
  customerID?: number,
  firstName?: string,
  lastName?: string,
  phone?: string,
  email?: string,
  extraContacts?: [
    {
      name?:string,
      phone?:string
    }
  ],
  location?:{
    street?: string,
    city?: string,
    notes?: string,
    zipcode?: number
  }
  dateJoin?: Date
}
