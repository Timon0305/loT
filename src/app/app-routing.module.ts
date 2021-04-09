import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MembersViewComponent} from './members-view/members-view.component';
import {GuestViewComponent} from './guest-view/guest-view.component';
import {PageDashboardComponent} from './pages/page-dashboard/page-dashboard.component';
import {NewCustomerComponent} from './pages/customers/new-customer/new-customer.component';
import {ManageCustomersComponent} from './pages/customers/manage-customers/manage-customers.component';
import {NewPropertyComponent} from './pages/properties/new-property/new-property.component';
import {ManagePropertiesComponent} from './pages/properties/manage-properties/manage-properties.component';
import {InitDeviceComponent} from './pages/devices/init-device/init-device.component';
import {ManageDevicesComponent} from './pages/devices/manage-devices/manage-devices.component';
import {AlertWatchComponent} from './pages/alerts/alert-watch/alert-watch.component';
import {AddUserComponent} from './pages/users/add-user/add-user.component';
import {AppLoginComponent} from './app-login/app-login.component';
import {AuthGuard} from "../core/guard/auth.guard";
import {Select} from "@ngxs/store";
import {NavState} from "./store/nav/nav.state";
import {Observable} from "rxjs";

const adminRoute = [
    {
        path: 'dashboard',
        component: PageDashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'dashboard',
        component: PageDashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'alert-watch',
        component: AlertWatchComponent,
        data: {
            title: 'Alerts Watch',
            father: 'Alerts'
        }
    },
    {
        path: 'new-customer',
        component: NewCustomerComponent,
        data: {
            title: 'New Customer',
            father: 'Customers'
        }
    },
    {
        path: 'manage-customers',
        component: ManageCustomersComponent,
        data: {
            title: 'Manage Customers',
            father: 'Customers'
        }
    },
    {
        path: 'add-property',
        component: NewPropertyComponent,
        data: {
            title: 'Add Property',
            father: 'Properties'
        }
    },
    {
        path: 'manage-properties',
        component: ManagePropertiesComponent,
        data: {
            title: 'Manage Properties',
            father: 'Properties'
        }
    },
    {
        path: 'add-device',
        component: InitDeviceComponent,
        data: {
            title: 'New Device',
            father: 'Devices'
        }
    },
    {
        path: 'manage-devices',
        component: ManageDevicesComponent,
        data: {
            title: 'Mange Devices',
            father: 'Devices'
        }
    },
    {
        path: 'add-user',
        component: AddUserComponent,
        data: {
            title: 'Add User',
            father: 'Users'
        }
    },
    {
        path: 'error/:type',
        component: PageDashboardComponent
    },
    {
        path: '',
        redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard', pathMatch: 'full'
    }
];

const techRoute = [
    {
        path: 'add-device',
        component: InitDeviceComponent,
        data: {
            title: 'New Device',
            father: 'Devices'
        }
    },
    {
        path: 'manage-devices',
        component: ManageDevicesComponent,
        data: {
            title: 'Mange Devices',
            father: 'Devices'
        }
    },
    {
        path: '',
        redirectTo: 'add-device', pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'add-device', pathMatch: 'full'
    }
];

const userRoute = [
    {
        path: 'dashboard',
        component: PageDashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'dashboard',
        component: PageDashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'alert-watch',
        component: AlertWatchComponent,
        data: {
            title: 'Alerts Watch',
            father: 'Alerts'
        }
    },
    {
        path: 'new-customer',
        component: NewCustomerComponent,
        data: {
            title: 'New Customer',
            father: 'Customers'
        }
    },
    {
        path: 'manage-customers',
        component: ManageCustomersComponent,
        data: {
            title: 'Manage Customers',
            father: 'Customers'
        }
    },
    {
        path: 'add-property',
        component: NewPropertyComponent,
        data: {
            title: 'Add Property',
            father: 'Properties'
        }
    },
    {
        path: 'manage-properties',
        component: ManagePropertiesComponent,
        data: {
            title: 'Manage Properties',
            father: 'Properties'
        }
    },
    {
        path: 'add-device',
        component: InitDeviceComponent,
        data: {
            title: 'New Device',
            father: 'Devices'
        }
    },
    {
        path: 'manage-devices',
        component: ManageDevicesComponent,
        data: {
            title: 'Mange Devices',
            father: 'Devices'
        }
    },
    {
        path: 'error/:type',
        component: PageDashboardComponent
    },
    {
        path: '',
        redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard', pathMatch: 'full'
    }
];

const routes: Routes = [
    {
        path: 'auth',
        component: GuestViewComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: AppLoginComponent
            }
        ]
    },
    {
        path: '',
        component: MembersViewComponent,
        canActivate: [AuthGuard],
        children: []
    },
    {
        path: '**',
        redirectTo: 'error/403',
        pathMatch: 'full'
    }
];

let role = localStorage.getItem('role');
if (role === 'admin') {
    routes[1].children = adminRoute
} else if (role === 'tech') {
    routes[1].children = techRoute
} else {
    routes[1].children = userRoute
}

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}


