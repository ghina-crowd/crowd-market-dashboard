import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../../../models/category";
import {DataService} from "../../../../services/data.service";
import {ProductModel, UnitModel} from "../../../../models/product.model";
import {FarmerModel} from "../../../../models/Farmer.model";
import Swal from "sweetalert2";
import {UserModel} from "../../../../models/user.model";


@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

    displayedColumns: string[] = ['product_id', 'name_en', 'name_ar', 'status', 'image', 'action'];
    dataSource: any;
    page = 0;
    filter = new PaginationModel();
    categories: Category[] = [];
    unites: UnitModel[] = [];
    farmers: FarmerModel[] =[];
    allfarmers: FarmerModel[] =[];
    allCategories: Category[] = [];
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    decoded: any;
    filterForm: FormGroup;

    constructor(private restService: DataService,
                private fb: FormBuilder,
                public appService: AppService,
                private toastr: ToastrService) {

    }

    get f() {
        return this.filterForm.controls;
    }


    confirmeActiveUnactive(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.update(item, status);

                }
            });
    }


    update(data: ProductModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        this.restService.updateProduct(data).then((res) => {
            if (res.code === 200) {
                // let index = this.dataSource.filteredData.indexOf(data);
                // this.dataSource.filteredData[index] = result;
                // this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
                // let index = this.getProducts().findIndex(item => item.user_id == data.user_id);
                // this.users[index].active = status;
                // this.dataSource = new MatTableDataSource(this.users);

                Swal.fire(
                    'Update!',
                    'The product has been updated.',
                    'success'
                );
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }



    applyFilter() {
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getProducts();
    }

    search(type) {
        if (type === 'category') {
            let keyword = this.f.category.value;
            if (keyword) {
                this.categories = this.categories.filter(item => item.name_en.toLowerCase().includes(keyword));
                this.filter.category_id = this.categories[0].category_id;


            } else {
                this.categories = this.allCategories;
            }
            } else if (type === 'farmer') {
                let keyword = this.f.farmer.value;
                if (keyword) {
                    this.farmers = this.allfarmers.filter(item => item.title_en.toLowerCase().includes(keyword));
                } else {
                    this.farmers = this.allfarmers;
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



    getFarmers() {

        this.filter.page = -1;
        this.restService.filterFarmers(this.filter).then((res) => {
            if (res.code === 200) {
                this.farmers = res.data.Farmers;
                this.allfarmers = this.farmers;

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    getProducts() {
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.filter.page = this.page;
        this.restService.filterProducts(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.dataSource = new MatTableDataSource(res.data.Products);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.filterForm = this.fb.group({
            keyword: [''],
            category: [''],
            category_id: [''],
            type: [''],
        });
    }




    ngOnInit() {
        this.prepareForm();
        this.getCategories();
        if(this.appService.decoded.user_type ===  'admin'){
            this.getFarmers();

        }else{
            this.filter.farmer_id = this.appService.decoded.farmer_id;
        }
        this.getProducts();
    }


}
