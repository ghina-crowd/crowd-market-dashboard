import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {NewBoxComponent} from "./new-box.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AuthGuard} from "../../../../guard/auth.guard";


const routes = [
    {
        path     : 'box/:id',
        component: NewBoxComponent,
        canActivate: [AuthGuard],


    }
];


@NgModule({
    declarations: [NewBoxComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule ,
        FuseSharedModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        NgMultiSelectDropDownModule.forRoot()


    ]
})
export class NewBoxModule { }
