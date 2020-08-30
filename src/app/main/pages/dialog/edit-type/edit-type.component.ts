import { Component, OnInit } from '@angular/core';
import {CityModel} from "../../../../../models/meal.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeModel} from "../../../../../models/category";

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

    data: TypeModel ;
    typeForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditTypeComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.typeForm.controls;
    }

    addNewType() {
        // tslint:disable-next-line:prefer-const
        this.f.active.setValue(1);
        let model: TypeModel = this.typeForm.value as TypeModel;
        this.restService.addType(model).then((res) => {
            if (res.code === 200) {
                this.toastr.success( 'The type has been updated successfully', '');
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let model: TypeModel = this.typeForm.value as TypeModel;
        this.restService.updateType(model).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The type has been updated successfully', '');
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.typeForm = this._formBuilder.group({
            type_id: [null],
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
            this.typeForm.patchValue(this.data);
        } else {

        }

    }


}
