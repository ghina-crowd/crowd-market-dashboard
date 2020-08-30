import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CountryModel} from "../../../../../models/meal.model";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

    data: CountryModel;
    icon: string;
    countryForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<CountryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.countryForm.controls;
    }

    addNewCountry() {
        // tslint:disable-next-line:prefer-const
        let countryModel: CountryModel = this.countryForm.value as CountryModel;
        this.restService.addCountry(countryModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success( 'The country has been added successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
                // this.appService.image.next('');
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let countryModel: CountryModel = this.countryForm.value as CountryModel;
        countryModel.image = this.restService.image ? this.restService.image : this.countryForm.controls.image.value;
        this.restService.updateCountry(countryModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The country has been updated successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.countryForm = this._formBuilder.group({
            country_id: [null],
            name_en: [null, [Validators.required]],
            name_ar: [null, [Validators.required]],
            image: [null, [Validators.required]],

        });

    }

    close(){
        this._dialog.closeAll();
        // this.appService.image.next('');
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.countryForm.patchValue(this.data);
        }

    }

}
