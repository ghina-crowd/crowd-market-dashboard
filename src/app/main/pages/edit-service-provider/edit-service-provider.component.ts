import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Appearance, Location} from "@angular-material-extensions/google-maps-autocomplete";
import {Subject} from "rxjs";
import {ProfileService} from "../profile/profile.service";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ProviderModel} from "../../../../models/provider.model";
import {fuseAnimations} from "../../../../@fuse/animations";
import PlaceResult = google.maps.places.PlaceResult;
import {ActivatedRoute} from "@angular/router";
import {CityModel} from "../../../../models/meal.model";

@Component({
    selector: 'app-edit-service-provider',
    templateUrl: './edit-service-provider.component.html',
    styleUrls: ['./edit-service-provider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class EditServiceProviderComponent implements OnInit {

    timeline: any;
    providerForm: FormGroup;
    fileData: File = null;
    signedFormURL: any = null;
    copyLicence: any = null;
    ownerID: any = null;
    holdingOwnerID: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    location: string;
    latitude: number;
    longitude: number;
    signedFormName: string;
    copyLicenceName: string;
    ownerIDName: string;
    holdingOwnerIDName: string;
    currentDate = new Date();
    public appearance = Appearance;
    public zoom: number;
    cities: CityModel[] = [];
    company_id: string;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private _formBuilder: FormBuilder,
        public restService: DataService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    onLocationSelected(location: Location) {
        console.log('onLocationSelected: ', location);
        this.latitude = location.latitude;
        this.longitude = location.longitude;

    }

    get p() {
        return this.providerForm.controls;
    }

    onAutocompleteSelected(result: PlaceResult) {
        console.log('onAutocompleteSelected: ', result.formatted_address);
        this.location = result.formatted_address;


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    fileProgress(fileInput: any, type) {
        this.fileData = <File>fileInput.target.files[0];
        this.uploadImageFile(this.fileData, type);

    }

    uploadImageFile(file, type) {
        let formData = new FormData();
        formData.append('file', file);

        // this.restService.uploadFile(formData).then((res) => {
        //     if (res.code === 200) {
        //         if (type === 1) {
        //             this.signedFormName = res.data[0];
        //         } else if (type === 2) {
        //             this.copyLicenceName = res.data[0];
        //
        //         } else if (type === 3) {
        //             this.ownerIDName = res.data[0];
        //
        //         } else {
        //             this.holdingOwnerIDName = res.data[0];
        //
        //         }
        //
        //
        //     } else {
        //         this.toastr.error(res.message, '');
        //     }
        //
        //
        // }).catch((err: HttpErrorResponse) => {
        //
        // });
    }


    preview(type) {
        // Show preview
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            if (type === 1) {
                this.signedFormURL = reader.result;
            } else if (type === 2) {
                this.copyLicence = reader.result;

            } else if (type === 3) {
                this.ownerID = reader.result;

            } else {
                this.holdingOwnerID = reader.result;

            }

        }
    }

    /**
     * On init
     */
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

    getCompantInfo() {
        // tslint:disable-next-line:prefer-const

        // this.restService.getBranches(this.company_id).then(res => {
        //     const result: ProviderModel = res.data as ProviderModel;
        //     if (res.code === 200) {
        //         this.providerForm.patchValue(result);
        //         result.company_branches.forEach((item: BranchModel) => {
        //             if (item.status === 1) {
        //                 this.zoom = 10;
        //                 this.latitude = +item.latitude
        //                 this.longitude = +item.longitude;
        //                 this.location = item.location_name;
        //                 this.p.city_id.setValue(item.city_id);
        //
        //
        //             }
        //         });
        //
        //     } else {
        //         this.toastr.error(res.message, '');
        //     }
        // }).catch((err: HttpErrorResponse) => {

        // });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let providerModel: ProviderModel = this.providerForm.value as ProviderModel;
        providerModel.company_id = this.company_id;
        providerModel.latitude = this.latitude;
        providerModel.longitude = this.longitude;
        providerModel.location_name = this.location;
        if (this.signedFormName) {
            providerModel.url_signed_company_form = this.signedFormName;
        }
        if (this.copyLicenceName) {
            providerModel.url_trade_license = this.copyLicenceName;
        }
        if (this.ownerIDName) {
            providerModel.url_service_provider_id = this.ownerIDName;
        }
        if (this.holdingOwnerIDName) {
            providerModel.url_owner_photo_with_id = this.holdingOwnerIDName;
        }

        this.restService.updateProvider(providerModel).then(res => {
            const result: ProviderModel = res.data as ProviderModel;

            if (res.code === 200) {
                this.toastr.success('The Service Provider is updated successfully', '');
                this.providerForm.patchValue(result);
                // result.company_branches.forEach((item: BranchModel) => {
                //     if (item.status === 1) {
                //         this.zoom = 10;
                //         console.log(+item.latitude);
                //         this.latitude = +item.latitude
                //         this.longitude = +item.longitude;
                //         this.location = item.location_name;
                //     }
                // });


            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

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

    prepareForm() {
        this.providerForm = this._formBuilder.group({
            company_role: ['', Validators.required],
            company_name_en: ['', Validators.required],
            company_name_ar: ['', Validators.required],
            licence_number: ['', Validators.required],
            expiry_date: ['', Validators.required],
            tax_number: ['', Validators.required],
            trade_name: ['', Validators.required],
            number_of_locations: ['', Validators.required],
            nature_of_business: ['', Validators.required],
            landline_number: ['', Validators.required],
            description_en: ['', Validators.required],
            description_ar: ['', Validators.required],
            city_id: ['', Validators.required],
            target: ['', Validators.required],
            cost_type: ['', Validators.required],
            website_link: [''],
            facebook_page: [''],
            instagram_page: [''],
            url_signed_company_form: [''],
            url_trade_license: [''],
            url_service_provider_id: [''],
            url_owner_photo_with_id: [''],


        });
    }


    ngOnInit(): void {

        this.prepareForm();
        this.getCities();
        this.route.params.subscribe(params => {
            this.company_id = params.id;
            this.getCompantInfo();


        });

        // this.setCurrentPosition();

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
