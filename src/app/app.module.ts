import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppConfig } from './app.config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { NewCustomerComponent } from './pages/customers/new-customer/new-customer.component';
import { ManageCustomersComponent } from './pages/customers/manage-customers/manage-customers.component';
import { CustomerComponent } from './pages/customers/customer-form/customer.component';
import { NewPropertyComponent } from './pages/properties/new-property/new-property.component';
import { PropertyFormComponent } from './pages/properties/property-form/property-form.component';
import { ManagePropertiesComponent } from './pages/properties/manage-properties/manage-properties.component';
import { InitDeviceComponent } from './pages/devices/init-device/init-device.component';
import { ManageDevicesComponent } from './pages/devices/manage-devices/manage-devices.component';
import { AlertWatchComponent } from './pages/alerts/alert-watch/alert-watch.component';
import { AppToastrComponent } from './app-toastr/app-toastr.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { MembersViewComponent } from './members-view/members-view.component';
import { GuestViewComponent } from './guest-view/guest-view.component';
import { AppLoginComponent } from './app-login/app-login.component';

export function initConfig(appConfig: AppConfig) {
  return () => appConfig.load();
  }

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppFooterComponent,
    PageHeaderComponent,
    PageDashboardComponent,
    NewCustomerComponent,
    ManageCustomersComponent,
    CustomerComponent,
    NewPropertyComponent,
    PropertyFormComponent,
    ManagePropertiesComponent,
    InitDeviceComponent,
    ManageDevicesComponent,
    AlertWatchComponent,
    AppToastrComponent,
    AddUserComponent,
    MembersViewComponent,
    GuestViewComponent,
    AppLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule,
    NgbModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AppConfig,{ provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
