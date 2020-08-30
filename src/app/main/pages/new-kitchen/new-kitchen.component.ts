import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {KitchenModel} from "../../../../models/kitchen.model";
import {DatePipe} from "@angular/common";
import {AppService} from "../../../app.service";
import {PaginationModel} from "../../../../models/pagination.model";
import {UserModel} from "../../../../models/user.model";
import {Appearance, Location} from "@angular-material-extensions/google-maps-autocomplete";
import {ActivatedRoute} from "@angular/router";
import PlaceResult = google.maps.places.PlaceResult;
import {ImageCroppedDialogComponent} from "../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {FarmerModel} from "../../../../models/Farmer.model";
import {ProductModel} from "../../../../models/product.model";

@Component({
    selector: 'app-new-kitchen',
    templateUrl: './new-kitchen.component.html',
    styleUrls: ['./new-kitchen.component.scss'],
    providers: [DatePipe]

})
export class NewKitchenComponent implements OnInit {
    StoreForm: FormGroup;
    user = '';
    id: number;
    users: UserModel[] = [];
    allUsers: UserModel[] = [];
    public appearance = Appearance;
    public zoom: number;
    public latitude: number;
    public longitude: number;
    public location: string;

    constructor(private _formBuilder: FormBuilder,
                public restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService,
                public datepipe: DatePipe,
                public appService: AppService,
                private route: ActivatedRoute
    ) {
    }

    get f() {
        return this.StoreForm.controls;
    }


    onSubmit() {
         this.f.active.setValue(1);
         this.f.featured.setValue('0');
        let model: FarmerModel = this.StoreForm.value as FarmerModel;
        this.restService.addFarmer(model).then((res) => {
            if (res.code === 200) {
                this.StoreForm.reset();
                Object.keys(this.StoreForm.controls).forEach(key => {
                    this.StoreForm.controls[key].setErrors(null);
                });
                this.toastr.success( 'The Store has been added successfully', '');

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }

    onLocationSelected(location: Location) {
        this.f.lat.setValue(location.latitude);
        this.f.lng.setValue(location.longitude);
    }

    onAutocompleteSelected(result: PlaceResult) {
        this.f.location_address.setValue(result.formatted_address);
    }

    prepareForm() {
        this.StoreForm = this._formBuilder.group({
            farmer_id: [null],
            description_en: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            featured: [null],
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            image: [null, [Validators.required]],
            user_id: [null],
            user: [null ,  [Validators.required]],
            lat: [null, [Validators.required]],
            lng: [null, [Validators.required]],
            location_address: [null, [Validators.required]],
            active: [null],

        });
    }



    filterUser() {
        let keyword = this.f.user.value;
        if (keyword) {
            this.users = this.users.filter(item => item.email.toLowerCase().includes(keyword));
        } else {
            this.users = this.allUsers;
        }
    }


    openDialog() {
        let dialog = this.dialog.open(ImageCroppedDialogComponent);
        dialog.afterClosed().subscribe(result => {
            this.uploadTextFile(result );
        });
    }


    uploadTextFile(file) {
        let formData = new FormData();
        formData.append('base64', file);
        console.log(formData.get('base64'));
        this.restService.uploadTextFile(formData).then((res) => {
            if (res.code === 200) {
                this.f.image.setValue( res.data.url);
            } else {
            }
        }).catch((err: HttpErrorResponse) => {
            this.toastr.error('The image is too large' , '');
            console.log('The image is too large');

        });
    }



    getUsersByType() {
        let pagination = new PaginationModel();
        pagination.page = -1;
        pagination.user_type = 'ServicePro';
        this.restService.getUsers(pagination).then((res) => {
            if (res.code === 200) {
                this.users = res.data;
                this.allUsers = this.users;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }

    getUserID(email) {
        let user = this.allUsers.filter(item => item.email === email);
        console.log(user);
        this.f.user_id.setValue(user[0].user_id);
    }



    getFarmer(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getFarmerByID(id).then((res) => {
            const result: KitchenModel = res.data as KitchenModel;
            if (res.code === 200) {
                this.StoreForm.patchValue(result);
                this.f.user.setValue(result.user_id);
                this.f.user_id.setValue(result.user_id);
                this.latitude = +res.data.lat;
                this.longitude = +res.data.lng;
                this.location = res.data.location_address;
                this.zoom = 12;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    update() {
        let model: FarmerModel = this.StoreForm.value as FarmerModel;
        this.restService.updateFarmer(model).then((res) => {
            const result: FarmerModel = res.data as FarmerModel;
            if (res.code === 200) {
                this.toastr.success( 'The Farmer has been updated successfully', '');

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });

    }

    ngOnInit() {
        this.prepareForm();
        this.getUsersByType();


        this.route.params.subscribe(params => {
            this.id = params.id;
            if (this.id == 0) {
                this.setCurrentPosition();
            } else {
                this.getFarmer(params.id);
            }

        });
    }


    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

}
