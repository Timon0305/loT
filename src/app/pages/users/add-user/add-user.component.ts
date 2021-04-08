import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersApiService } from '../usersApi.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  closeResult: string = '';
  userRoles:any[] = [];
  resultStats={
    status:'',
    info:''
  }
  userForm = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('+972',[Validators.required]),
    role: new FormControl(''),
    password: new FormControl('',[Validators.required])
  })

  constructor(
    private modalService: NgbModal,
    private userApi: UsersApiService
  ) { }
  ngOnInit(): void {
    this.userApi.getRoles().subscribe(result=>{
      result.forEach((role: any) => {
        this.userRoles.push(role);
      });
    })
  }

  doubleCheck(content:any){
    this.modalService.open(content, { centered: true });
  }

  sendForm(){
    console.log(this.userForm.value);
    this.userApi.addCustomer(this.userForm.value)
    .subscribe(result=>{
      this.resultStats.status = result.status;
      if(result.status =='OK'){
        this.userForm.reset();
        this.modalService.dismissAll();
      }
      else{
        this.modalService.dismissAll();
        this.resultStats.info = result.info;
      }
    })
  }

  get nameStatus(){
    return this.userForm.get('fullName')?.errors;
  }
  get emailStatus(){
    return this.userForm.get('email')?.errors;
  }
  get phoneStatus(){
    return this.userForm.get('phone')?.errors;
  }
  get passStatus(){
    return this.userForm.get('password')?.errors;
  }
  get formStatus(){
    return this.userForm;
  }
}
