import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {AuthGuard} from "../../../../guard/auth.guard";
import {EditServiceProviderComponent} from "./edit-service-provider.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";



const routes = [
    {
        path     : 'edit_Service_provider/:id',
        component: EditServiceProviderComponent,
        canActivate: [AuthGuard],
    }
];


@NgModule({
  declarations: [EditServiceProviderComponent],
  imports: [
      RouterModule.forChild(routes),
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatRadioModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule ,
      FuseSharedModule,
      MatDatepickerModule ,
      MatSelectModule,
      MatGoogleMapsAutocompleteModule.forRoot(),
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAl_KkpIB-kNu2GIhc4Kxejd0DDESQWMRM',
          libraries: ['places']
      }),
  ]
})
export class EditServiceProviderModule { }
