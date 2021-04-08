import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
  menu ={
    index:true,
    alerts:true,
    customres:true,
    properties:true,
    devices:true
  }
  constructor() { }

  ngOnInit(): void {
  }

  // toggle(who:boolean){
  //   if(who){
  //     who =false;
  //   }else{
  //     who = true;
  //   }
  //   return who
  // }



}
