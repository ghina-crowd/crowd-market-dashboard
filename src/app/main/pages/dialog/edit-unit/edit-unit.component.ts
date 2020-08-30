import { Component, OnInit } from '@angular/core';
import {BannerModel} from "../../../../../models/banner.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {UnitModel} from "../../../../../models/product.model";

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {

    data: UnitModel;
    icon: string;
    unitForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditUnitComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.unitForm.controls;
    }

    addNewUnit() {
        // tslint:disable-next-line:prefer-const
        let unit: UnitModel = this.unitForm.value as UnitModel;
        this.restService.addUnit(unit).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The unit has been added successfully', '');
                this.dialogRef.close(res.data);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let unit: UnitModel = this.unitForm.value as UnitModel;
        this.restService.updateUnit(unit).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The unit has been updated successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.unitForm = this._formBuilder.group({
            unit_id: [null],
            name_en: [null, [Validators.required]],
            name_ar: [null, [Validators.required]],
        });

    }

    close() {
        this._dialog.closeAll();
        this.appService.image.next('');
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.unitForm.patchValue(this.data);
        }

    }

}
