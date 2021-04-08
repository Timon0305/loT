import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlertsApiService } from '../alerts.service';
import { DeviceApiService } from '../../devices/devicesApi.service';
import { Alert } from '../Alert';
import { RemoteDevice } from '../../devices/device';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-watch',
  templateUrl: './alert-watch.component.html',
  styleUrls: ['./alert-watch.component.scss']
})
export class AlertWatchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})

  //Variables
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {}; //Datatable
  alertsList:Alert[] = []; //Alerts for table
  devicesTypes:any[] = []; //Device types for search
  closeResult = '';        //For modal
  dateRange = {
    startDate:Date,
    endDate:Date
  }
  columns = [              //Columns for POST request
    {
      data: 'status',
      search:''
    }, {
      data: 'timestamp',
      searchable:false,
      width:"18%"
    }, {
      data: 'kind',
      search:''
    }, {
      data : 'zone',
      search:''
    }, {
      data : '',
      search:'',
      searchable:false
    }, {
      data: 'origin',
      search:''
    }]

  //Selected alert - Modal
  selectedAlert?:Alert;
  remoteDevice?:RemoteDevice;
  modalLoading:boolean = false;
  statusOpt:any[] = [];
  selectedStatus?:string;
  commentStatus:string = '';
  changeStatusReq?:string;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private alertsApi: AlertsApiService,
    private devicesApi: DeviceApiService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    //Start Datatable
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      lengthMenu: [10, 25, 50, 100],
      order:[[1,'asc']],
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.dateRange = this.dateRange;
        that.alertsApi.getAlerts(dataTablesParameters)
          .subscribe(resp => {
            that.alertsList = resp.data as Alert[];
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: this.columns
    };

    //Update the device types for search
    this.devicesApi.getDeviceTypes().subscribe(result=>{
      //Result should be [{type-value,title-UI text}]
      result.forEach((deviceType: any) => {
        this.devicesTypes.push(deviceType)
      });
    })
    this.alertsApi.getStatusOpt().subscribe(result=>{
      result.forEach((status:any) => {
        this.statusOpt.push(status)
      });
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    //Enable search for each column and listen for change
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          let thisInput = this as HTMLInputElement;
          if (that.search() !== thisInput.value) {
            that
              .search(thisInput.value)
              .draw();
          }
        });
        $('select', this.footer()).on('keyup change', function () {
          let thisInput = this as HTMLInputElement;
          if (that.search() !== thisInput.value) {
            that
              .search(thisInput.value)
              .draw();
          }
        });
      });
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getStatusTitle(value:string){
    return this.statusOpt.find(status=>status.value == value).title;
  }

  //Modal for rows
  openAlertModal(viewAlert:any,alert:Alert){
    this.modalLoading = true;
    this.selectedAlert = alert;
    this.selectedStatus = alert.status;
    const deviceID = {_id:alert.fatherPanel?._id};

    this.devicesApi.getDevice(deviceID)
      .subscribe(result=>{
        if(result.status =='OK'){
          this.remoteDevice = result.data;
        }
        this.modalLoading = false
      })
    this.modalService.open(viewAlert, { centered: true }).result.then((result) => {
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

  changeStatus():void{
    if(this.selectedAlert && this.selectedStatus){
      this.alertsApi.changeStatus(this.selectedAlert._id,this.selectedStatus,this.commentStatus)
        .subscribe(result=>{
          if(result.status == 'OK'){
            this.changeStatusReq='Changed';
            setTimeout(()=>{                           //<<<---using ()=> syntax
              this.modalService.dismissAll();
              this.rerender();
              this.changeStatusReq = undefined;
            }, 2000);
          }
          else{
            this.changeStatusReq = result.info
          }
      })
    }else{
      this.changeStatusReq = 'Problem with data - internal issue'
    }
  }
}
