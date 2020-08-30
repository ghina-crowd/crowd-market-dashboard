import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KitchenCountriesComponent} from "./kitchen-countries.component";
import {MyRequestsComponent} from "../my-requests/my-requests.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AuthGuard} from "../../../../guard/auth.guard";


const routes = [
    {
        path     : 'categories',
        component: KitchenCountriesComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
  declarations: [KitchenCountriesComponent],
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
export class KitchenCountriesModule { }
