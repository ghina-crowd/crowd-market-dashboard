import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Appearance, Location} from '@angular-material-extensions/google-maps-autocomplete';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../../../../../models/category";
import {UserModel} from "../../../../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute} from "@angular/router";
import {KitchenModel} from "../../../../../../models/kitchen.model";
import {PaginationModel} from "../../../../../../models/pagination.model";
import * as jwt_decode from 'jwt-decode';
import PlaceResult = google.maps.places.PlaceResult;
import {ImageCroppedDialogComponent} from "../../../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {FarmerModel} from "../../../../../../models/Farmer.model";


@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [DatePipe]


})
export class ProfileTimelineComponent implements OnInit, OnDestroy {


    farmerForm: FormGroup;
    id: number;
    public appearance = Appearance;
    public zoom: number;
    public latitude: number;
    public longitude: number;
    public location: string;
    private _unsubscribeAll: Subject<any>;

    constructor(private _formBuilder: FormBuilder,
                public restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService,
                public datepipe: DatePipe,
                public appService: AppService,
                private route: ActivatedRoute
    ) {
        this._unsubscribeAll = new Subject();

    }

    get f() {
        return this.farmerForm.controls;
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


    onLocationSelected(location: Location) {
        console.log('onLocationSelected: ', location);
        this.f.lat.setValue(location.latitude);
        this.f.lng.setValue(location.longitude);
    }

    onAutocompleteSelected(result: PlaceResult) {
        console.log('onAutocompleteSelected: ', result);
        this.f.location.setValue(result.formatted_address);
    }

    prepareForm() {
        this.farmerForm = this._formBuilder.group({
            farmer_id: [null],
            description_en: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            featured: [null],
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            image: [null, [Validators.required]],
            user_id: [null],
            lat: [null, [Validators.required]],
            lng: [null, [Validators.required]],
            location_address: [null, [Validators.required]],
            active: [null],

        });
    }




    getFarmer(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getFarmerByID(id).then((res) => {
            const result: KitchenModel = res.data as KitchenModel;
            if (res.code === 200) {
                this.farmerForm.patchValue(result);
                this.latitude = +res.data.lat;
                this.longitude = +res.data.lng;
                console.log(this.latitude);
                this.location = res.data.location_address;
                this.zoom = 12;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    update() {
        let model: FarmerModel = this.farmerForm.value as FarmerModel;
        this.restService.updateFarmer(model).then((res) => {
            const result: FarmerModel = res.data as FarmerModel;
            if (res.code === 200) {
                this.toastr.success( ' The Store has been updated successfully', '');

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });

    }

    ngOnInit() {
        this.prepareForm();
        this.getFarmer(this.appService.decoded.farmer_id);

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
