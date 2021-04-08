import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormOptions } from '../formOptions';
import { Property, SelectedProperty } from '../property';
import { PropertiesApiService } from '../propertyApi.service';

@Component({
  selector: 'manage-properties',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.scss']
})
export class ManagePropertiesComponent implements OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  properties: Property[] = [];
  closeResult = '';
  selectedProperty:SelectedProperty = {};
  formOptions:FormOptions={
    buttonText:'Save',
    existing:true,
    action:'edit'
  }
  constructor(
    private propertyApi:PropertiesApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: true,
      pageLength: 10,
      processing: true,
      columnDefs:[
        {width:'1%', targets:-1},
        {width:'1%', targets:-2}
      ],
      order:[[3,"desc"]]
    };

    this.propertyApi.getAllProperties()
    .subscribe(result=>{
      if(result.status =='OK'){
        this.properties = (result as any).data;
        this.dtTrigger.next();
      }
    })
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  editModal(editModal:any,property:SelectedProperty){
    this.selectedProperty = property;
    this.modalService.open(editModal,{centered:true})
  }
  deleteModal(deletePropertyModal:any, property:SelectedProperty){
    this.selectedProperty = property;
    this.modalService.open(deletePropertyModal, { centered: true });
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

  deleteThisProperty(selectedproperty:SelectedProperty){
    this.propertyApi.deleteProperty(selectedproperty._id)
      .subscribe(result=>{
        if(result['status'] == 'OK'){
          this.modalService.dismissAll();
          setTimeout(window.location.reload.bind(window.location), 2000);
        }else{
          console.log(result['info']);
          //Show error
        }
      })
  }
}
