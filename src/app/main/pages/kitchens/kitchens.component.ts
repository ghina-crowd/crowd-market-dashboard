import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {PaginationModel} from "../../../../models/pagination.model";
import {KitchenModel} from "../../../../models/kitchen.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../../app.service";
import {FarmerModel} from "../../../../models/Farmer.model";

@Component({
    selector: 'app-kitchens',
    templateUrl: './kitchens.component.html',
    styleUrls: ['./kitchens.component.scss']
})
export class KitchensComponent implements OnInit {

    displayedColumns: string[] = ['farmer_id', 'name_en', 'name_ar', 'status', 'image',  'action'];
    dataSource: any;
    page = 0;
    farmers: FarmerModel[] = [];
    // categories: Category[] = [];
    // allCategories: Category[] = [];
    filter = new PaginationModel();
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    filterForm: FormGroup;

    constructor(private restService: DataService,
                private fb: FormBuilder,
                private appService: AppService,
                private toastr: ToastrService) {

    }

    get f() {
        return this.filterForm.controls;
    }

    applyFilter(value) {
        this.filter.keyword = value;
        // if (category) {
        //     this.filter.category_id = category.category_id;
        //     this.f.category.setValue(category.name_en);
        // } else {
        //     this.f.category.setValue('All');
        //     this.filter.category_id = 0;
        // }

        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getFarmers();
    }


    getFarmers() {
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.filter.page = this.page;
        this.restService.filterFarmers(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.farmers = res.data.Farmers;
                this.dataSource = new MatTableDataSource(this.farmers);

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
        });
    }


    ngOnInit() {
        this.prepareForm();
        this.getFarmers();
    }

}
