import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestsComponent} from "../requests/requests.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MyRequestsComponent} from "./my-requests.component";
import {AuthGuard} from "../../../../guard/auth.guard";


    const routes = [
        {
            path     : 'my_requests',
            component: MyRequestsComponent,
            canActivate: [AuthGuard],

        }
    ];



@NgModule({
    declarations: [MyRequestsComponent],
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
export class MyRequestsModule { }
