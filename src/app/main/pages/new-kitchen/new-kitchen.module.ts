import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NewKitchenComponent} from "./new-kitchen.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {AuthGuard} from "../../../../guard/auth.guard";
const routes = [
    {
        path     : 'store/:id',
        component: NewKitchenComponent,
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
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxMaterialTimepickerModule.setLocale('ar-AE')
  ]
})
export class NewKitchenModule { }
