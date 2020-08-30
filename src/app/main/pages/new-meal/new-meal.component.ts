import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Category, TypeModel} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "../../../app.service";
import {ActivatedRoute} from "@angular/router";
import {CountryModel, MealModel} from "../../../../models/meal.model";
import * as jwt_decode from 'jwt-decode';
import {ImageCroppedDialogComponent} from "../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {ProductModel, UnitModel} from "../../../../models/product.model";
import {FarmerModel} from "../../../../models/Farmer.model";
import {PaginationModel} from "../../../../models/pagination.model";


@Component({
    selector: 'app-new-meal',
    templateUrl: './new-meal.component.html',
    styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {
    productForm: FormGroup;
    categories: Category[] = [];
    allCategories: Category[] = [];
    countries: CountryModel[] = [];
    allCountry: CountryModel[] = [];
    category = '';
    user = '';
    id: number;
    allFarmers: FarmerModel[] = [];
    farmers: FarmerModel[] = [];
    unites: UnitModel[] = [];
    decoded: any;
    types: TypeModel[];



    constructor(private _formBuilder: FormBuilder,
                public restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService,
                public appService: AppService,
                private route: ActivatedRoute
    ) {
    }

    get f() {
        return this.productForm.controls;
    }


    AddProduct() {
        let discount = this.f.discount.value ? this.f.discount.value : '0';
        let new_price = this.f.new_price.value ? this.f.new_price.value : '0';
        this.f.discount.setValue(discount);
        this.f.new_price.setValue(new_price);
        let model: ProductModel = this.productForm.value as ProductModel;
        this.restService.addProduct(model).then((res) => {
            if (res.code === 200) {
                this.productForm.reset();
                Object.keys(this.productForm.controls).forEach(key => {
                    this.productForm.controls[key].setErrors(null);
                });
                this.toastr.success('The product has been added successfully', '');

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }


    prepareForm() {
        this.productForm = this._formBuilder.group({
            product_id: [null],
            quantity_start: [null],
            quantity_increase: [null],
            description_en: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            // featured: [null],
            title_ar: [null, [Validators.required]],
            title_en: [null, [Validators.required]],
            image: [null, [Validators.required]],
            farmer_id: [null, [Validators.required]],
            category_id: [null, [Validators.required]],
            max_quantity: [null],
            price: [null, [Validators.required]],
            new_price: [null],
            type_id: [null, [Validators.required]],
            unit_id: [null, [Validators.required]],
            country_id: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            active: [null],
            discount: [null],

        });
    }

    filter(type) {
        if (type == 'category') {
            let keyword = this.f.category.value;
            if (keyword) {
                this.categories = this.categories.filter(item => item.name_en.toLowerCase().includes(keyword));
            } else {
                this.categories = this.allCategories;
            }
        } else if (type == 'farmer') {
            let keyword = this.f.farmer.value;
            if (keyword) {
                this.farmers = this.allFarmers.filter(item => item.title_en.toLowerCase().includes(keyword));
            } else {
                this.farmers = this.allFarmers;
            }
        }
    }


    getCategories() {
        this.restService.getCategories().then((res) => {
            if (res.code === 200) {
                this.categories = res.data;
                this.allCategories = this.categories;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }


    getTypes() {
        // tslint:disable-next-line:prefer-const
        this.restService.getTypes().then((res) => {
            if (res.code === 200) {
                this.types = res.data;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    getFarmers() {
        let pagination = new PaginationModel();
        pagination.page = -1;
        this.restService.filterFarmers(pagination).then((res) => {
            if (res.code === 200) {
                this.farmers = res.data.Farmers;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }

    getPoductsByFarmer() {
        let pagination = new PaginationModel();
        pagination.page = -1;
        this.restService.filterProducts(pagination).then((res) => {
            if (res.code === 200) {
                this.farmers = res.data;
                this.allFarmers = this.farmers;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }


    getUnites() {
        this.restService.getUnites().then((res) => {
            if (res.code === 200) {
                this.unites = res.data;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }


    getProductById(id) {
        this.restService.getProductByID(id).then((res) => {
            const result: ProductModel = res.data as ProductModel;
            if (res.code === 200) {
                this.productForm.patchValue(result);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }


    getFarmerID(name) {
        let farmer = this.allFarmers.filter(item => item.title_en === name);
        this.f.farmer_id.setValue(farmer[0].farmer_id);
    }


    updateProduct() {
        if (this.f.discount.value == false) {
            this.f.discount.setValue(0);
            this.f.new_price.setValue(0);
        }
        let model: ProductModel = this.productForm.value as ProductModel;
        this.restService.updateProduct(model).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The Product has been updated successfully', '');
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });

    }


    openDialog() {
        let dialog = this.dialog.open(ImageCroppedDialogComponent);
        dialog.afterClosed().subscribe(result => {
            this.uploadTextFile(result);
        });
    }

    uploadTextFile(file) {
        let formData = new FormData();
        formData.append('base64', file);
        console.log(formData.get('base64'));
        this.restService.uploadTextFile(formData).then((res) => {
            if (res.code === 200) {
                this.f.image.setValue(res.data.url);
            } else {
            }
        }).catch((err: HttpErrorResponse) => {
            this.toastr.error('The image is too large', '');
            console.log('The image is too large');

        });
    }

    getCountries() {
        // tslint:disable-next-line:prefer-const
        this.restService.getCountries().then((res) => {
            if (res.code === 200) {
                this.countries = res.data;
                this.allCountry = res.data;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    filterCountry() {
        let keyword = this.f.country.value;
        if (keyword) {
            this.countries = this.allCountry.filter(item => item.name_en.toLowerCase().includes(keyword));
        } else {
            this.countries = this.allCountry;
        }
    }

    getCountryID(value) {
        let country = this.allCountry.filter(item => item.name_en === value);
        console.log(country[0].country_id);
        this.f.country_id.setValue(country[0].country_id);
    }



    ngOnInit() {
        this.decoded = jwt_decode(localStorage.getItem('auth_token_crowd_admin'));
        this.prepareForm();
        this.getCategories();
        this.getUnites();
        this.getCountries();
        this.getTypes();

        if (this.decoded.user_type === 'admin') {
            this.getFarmers();
        } else {
            this.f.farmer_id.setValue(this.decoded.farmer_id);
        }


        this.route.params.subscribe(params => {
            this.id = params.id;
            if (params.id == 0) {

            } else {
                this.getProductById(params.id);
            }

        });
    }

}