import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserModel} from "../../../../../models/user.model";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import * as jwt_decode from 'jwt-decode';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private fb: FormBuilder,
        private appService: AppService,
        private restService: DataService,
        private toastr: ToastrService,
        private router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.loginForm.value as UserModel;
        this.restService.login(userModel).then((res) => {
            if (res.code === 200) {
                if (res.data.user_type != 'normal') {
                    localStorage.setItem('auth_token_crowd_admin', res.data.token);
                    localStorage.setItem('profile', res.data.profile);
                    this.appService.imageProfile.next(res.data.profile);
                    this.appService.decoded = jwt_decode(res.data.token);
                    console.log(this.appService.decoded);
                    localStorage.setItem('name', res.data.first_name);

                        this.router.navigateByUrl('/');


                    // this.appService.isUserLoggedIn.next(res.data.token);
                    // this.appService.isActive.next('1');
                } else {
                    this.toastr.error('You do not have permission to access dashboard', '');

                }
            } else if (res.code === -3) {
                this.toastr.error(res.message, '');
                // localStorage.setItem('auth_token', res.token);
            } else {
                this.toastr.error(res.message, '');
            }


        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        });
    }

    ngOnInit(): void {
        this.prepareForm();

    }
}
