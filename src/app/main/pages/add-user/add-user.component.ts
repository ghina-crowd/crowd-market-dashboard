import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SubCategoryModel} from "../../../../models/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Appearance} from "@angular-material-extensions/google-maps-autocomplete";
import * as jwt_decode from 'jwt-decode';
import {UserModel} from "../../../../models/user.model";
import {DatePipe} from "@angular/common";
import {CityModel} from "../../../../models/meal.model";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    providers: [DatePipe],
    encapsulation: ViewEncapsulation.None,

})
export class AddUserComponent implements OnInit {

    data: SubCategoryModel;
    UserForm: FormGroup;
    signedFormURL: any = null;
    copyLicence: any = null;
    ownerID: any = null;
    holdingOwnerID: any = null;
    location: string;
    latitude: number;
    longitude: number;
    expireDate: string;
    public appearance = Appearance;
    public zoom: number;
    decoded: any;
    currentDate = new Date();
    cities: CityModel[] = [];


    providerForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public datepipe: DatePipe,
                private restService: DataService,
                private toastr: ToastrService) {
    }

    get u() {
        return this.UserForm.controls;
    }

    OnDateChange(event) {
        this.expireDate = this.datepipe.transform(new Date(event.target.value), 'yyyy-MM-dd');
    }

    getCities() {
        // tslint:disable-next-line:prefer-const
        this.restService.getCities().then((res) => {
            if (res.code === 200) {
                this.cities = res.data;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    onSubmit() {
        // tslint:disable-next-line:prefer-const
        if (this.u.user_type.value === 'normal') {
            this.u.active.setValue(0);
        } else {
            this.u.active.setValue(1);

        }
        let userModel: UserModel = this.UserForm.value as UserModel;
        // userModel.company = this.providerForm.value as ProviderModel;
        this.restService.creatNewUser(userModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success(res.message, '');
                this.UserForm.reset();
                this.providerForm.reset();
                Object.keys(this.UserForm.controls).forEach(key => {
                    this.UserForm.controls[key].setErrors(null);
                });


                // this.UserForm.controls.setErrors(null);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {

        this.UserForm = this._formBuilder.group({
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            phone: [null, [Validators.required]],
            user_type: [null, [Validators.required]],
            company: [null],
            active: [null],
        });

    }



    ngOnInit() {
        this.decoded = jwt_decode(localStorage.getItem('auth_token_crowd_admin'));
        this.prepareForm();
        this.getCities();


    }

}
