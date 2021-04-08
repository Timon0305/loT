import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Customer, SelectedCustomer } from '../customer';
import { FormOptions } from '../formOptions'
import { CustomerApiService } from '../customerApi.service'

@Component({
  selector: 'manage-customers',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss']
})
export class ManageCustomersComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  customers: Customer[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  selectedCustomer: SelectedCustomer = {}; //For modal -> form compenent
  closeResult = '';
  customerFormOptions:FormOptions = {
    buttonText:'Save',
    existing:true,
    action:'edit'
  }

  constructor(
    private CustomerApiService:CustomerApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //Table setting
    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: true,
      pageLength: 10,
      processing: true,
      columnDefs:[
        {width:'1%', targets:-1},
        {width:'1%', targets:-2}
      ],
      order:[[5,"asc"]]
    };

    //Get data into the table
    this.CustomerApiService.getAllCustomers()
      .subscribe(data =>{
        this.customers = ( data as any ).data
        this.dtTrigger.next()
    })
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  //Open Customer form (edit mode)
  openCustomerForm(editCustomerModal:any, customer:Customer) {
    this.selectedCustomer = customer;
    this.modalService.open(editCustomerModal, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.selectedCustomer = {};
    });
  }

  //Deletion modal
  deleteUserModal(deleteCustomerModal:any, customer:Customer) {
    this.selectedCustomer = customer;
    this.modalService.open(deleteCustomerModal, { centered: true });
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

  deleteThisCustomer(customer:SelectedCustomer){
    this.CustomerApiService.deleteCustomer(customer._id)
      .subscribe(result=>{
        if(result['status'] == 'OK'){
          this.modalService.dismissAll();
          setTimeout(window.location.reload.bind(window.location), 3000);
        }else{
          console.log(result['info']);
          //Show error
        }
      })
  }
}
