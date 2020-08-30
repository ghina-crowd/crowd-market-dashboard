import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {NewMealComponent} from "./new-meal.component";
import {AuthGuard} from "../../../../guard/auth.guard";


const routes = [
    {
        path     : 'product/:id',
        component: NewMealComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule ,
        FuseSharedModule,


    ]
})
export class NewMealModule { }
