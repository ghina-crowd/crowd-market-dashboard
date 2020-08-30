import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ServiceProviderDetailsComponent} from "./service-provider-details.component";
import {AuthGuard} from "../../../../guard/auth.guard";




const routes = [
    {
        path     : 'service_provider/:id',
        component: ServiceProviderDetailsComponent,
        canActivate: [AuthGuard],


    }
];

@NgModule({
  declarations: [ServiceProviderDetailsComponent],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule ,
      FuseSharedModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
  ]
})
export class ServiceProviderDetailsModule { }
