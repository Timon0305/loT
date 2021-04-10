import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavState} from "../store/nav/nav.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app-sidebar.component.html',
    styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
    // @ts-ignore
    @Select(NavState.getChangedRole) changedRole: Observable<any>;
    menu = {
        index: true,
        alerts: true,
        customres: true,
        properties: true,
        devices: true
    };
    role: any;
    dashboardClass : Boolean = false;
    alertClass : Boolean = false;
    customerClass : Boolean = false;
    propertyClass : Boolean = false;
    deviceClass : Boolean = false;
    userClass : Boolean = false;

    constructor(
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.changedRole.subscribe(res => {
            this.role = res;
        });
        this.role = localStorage.getItem('role');
        this.cdr.detectChanges();
    }

    logout = () => {
        localStorage.clear();
        window.location.href = '/'
    };

    clickNav = (event: any) => {
        this.dashboardClass = false;
        this.alertClass = false;
        this.customerClass = false;
        this.propertyClass = false;
        this.deviceClass = false;
        this.userClass = false;
        switch (event) {
            case 'dashboard':
                this.dashboardClass = true;
                break;
            case 'alerts':
                this.alertClass = true;
                break;
            case 'customres':
                this.customerClass = true;
                break;
            case 'property':
                this.propertyClass = true;
                break;
            case 'device':
                this.deviceClass = true;
                break;
            case 'user':
                this.userClass = true;
                break;
            default:
                break;
        }
    }
}
