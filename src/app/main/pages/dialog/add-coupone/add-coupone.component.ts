import { Component, OnInit } from '@angular/core';
import {CountryModel} from "../../../../../models/meal.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CouponModel} from "../../../../../models/coupon.model";

@Component({
  selector: 'app-add-coupone',
  templateUrl: './add-coupone.component.html',
  styleUrls: ['./add-coupone.component.scss']
})
export class AddCouponeComponent implements OnInit {

    data: CouponModel;
    icon: string;
    couponForm: FormGroup;
    currentDate = new Date();

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<AddCouponeComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.couponForm.controls;
    }

    addNewCoupon() {
        // tslint:disable-next-line:prefer-const
        let countryModel: CouponModel = this.couponForm.value as CouponModel;
        this.restService.addCoupone(countryModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success( 'The coupon has been added successfully', '');
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
        let couponModel: CouponModel = this.couponForm.value as CouponModel;
        this.restService.editCopone(couponModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The coupon has been updated successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.couponForm = this._formBuilder.group({
            coupon_id: [null],
            code: [null, [Validators.required]],
            start_date: [null, [Validators.required]],
            end_date: [null, [Validators.required]],
            active: [null],
            max_limit: [null, [Validators.required]],
            value: [null, [Validators.required]],

        });

    }

    close(){
        this._dialog.closeAll();
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.couponForm.patchValue(this.data);
            console.log(this.couponForm.value);
        }

    }

}
