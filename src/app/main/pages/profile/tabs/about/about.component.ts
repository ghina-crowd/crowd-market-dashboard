import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {ProfileService} from 'app/main/pages/profile/profile.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../../authentication/reset-password/reset-password.component";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../../../../models/user.model";
import {ImageCroppedDialogComponent} from "../../../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "../../../../../app.service";

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
    personalInformation: FormGroup;
    changePasswordForm: FormGroup;

    about: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private restService: DataService,
        private appService: AppService,
        private toastr: ToastrService,
        private _profileService: ProfileService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    get p() {
        return this.personalInformation.controls;
    }




    getCompantInfo() {
        // tslint:disable-next-line:prefer-const
        this.restService.getProfile().then(res => {
            const result: UserModel = res.data as UserModel;
            if (res.code === 200) {
                this.personalInformation.patchValue(result);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepare() {
        this.personalInformation = this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: [''],
            phone: ['', [Validators.required]],
            old_password: ['', [Validators.minLength(8), Validators.maxLength(16)]],
            passwordConfirm: ['', [confirmPasswordValidator]],
            new_password: ['', [Validators.minLength(8), Validators.maxLength(16)]],
            // subscribe: ['']
        });


    }

    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.personalInformation.value as UserModel;
        if (userModel.password == '' && userModel.currentPassword == '' || userModel.password != '' && userModel.currentPassword != '') {
            this.restService.editProfile(userModel).then((res) => {
                if (res.code === 200) {
                    this.appService.imageProfile.next(res.data.profile);
                    this.toastr.success(res.message, '');

                } else {
                    this.toastr.error(res.message, '');

                }

            }).catch((err: HttpErrorResponse) => {

            });
        } else {
            this.toastr.error('Please enter new password');
        }
    }


    ngOnInit(): void {

        this.prepare();
        this.getCompantInfo();
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
