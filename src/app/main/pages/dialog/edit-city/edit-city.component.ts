import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CityModel} from "../../../../../models/meal.model";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {
  data: CityModel ;
  cityForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCityComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.cityForm.controls;
    }

    addNewCategory() {
        // tslint:disable-next-line:prefer-const
        this.f.active.setValue(1);
        let model: CityModel = this.cityForm.value as CityModel;
        this.restService.addCity(model).then((res) => {
            if (res.code === 200) {
                this.toastr.success(res.data.name_en + ' has been updated successfully', '');
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let model: CityModel = this.cityForm.value as CityModel;
        this.restService.updateCity(model).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The city has been updated successfully', '');
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.cityForm = this._formBuilder.group({
            city_id: [null],
            name_en: [null, [Validators.required]],
            name_ar: [null, [Validators.required]],
            active: [null],
        });

    }

    close(){
        this._dialog.closeAll();
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.cityForm.patchValue(this.data);
        } else {

        }

    }

}
