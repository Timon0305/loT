import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  pageName = "";
  fatherName = "";
  fatherExists = false;
  constructor(private router: Router, private activatedRoute:    ActivatedRoute, private titleService: Title) {
   }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
              if (child.firstChild) {
                  child = child.firstChild;
              } else if (child.snapshot.data) {
                  return child.snapshot;
              } else {
                  return null;
              }
          }
          return null;
      })
  ).subscribe( (data: any) => {
      if (data) {
        this.pageName = data.data.title;
        if(data.data.father){
          this.fatherExists = true;
          this.fatherName = data.data.father;
        }

      }
  });
  }

}
