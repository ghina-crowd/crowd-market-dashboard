import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryComponent} from "../dialog/edit-category/edit-category.component";
import {Category, CategoryTypeModel} from "../../../../models/category";


@Component({
    selector: 'app-kitchen-countries',
    templateUrl: './kitchen-countries.component.html',
    styleUrls: ['./kitchen-countries.component.scss']
})
export class KitchenCountriesComponent implements OnInit {
    displayedColumns: string[] = ['category_id', 'name_en', 'name_ar', 'status', 'image', 'color', 'action'];
    dataSource: any;
    page = 0;
    categories: Category[] = [];
    category_types: CategoryTypeModel [] = [];
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    decoded: any;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getCategories() {
        this.restService.getCategories().then((res) => {
            if (res.code === 200) {
                this.decoded = jwt_decode(localStorage.getItem('auth_token_crowd_admin'));

                this.categories = res.data;
                this.dataSource = new MatTableDataSource(this.categories);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    openEditDialog(category: Category) {
        console.log(category);
        let dialog = this.dialog.open(EditCategoryComponent);
        dialog.componentInstance.data = category;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
                let index = this.dataSource.filteredData.indexOf(category);
                // result.category_types.forEach(item => {
                //     this.dataSource.filteredData[index].category_types.push(item);
                // });
                // this.category_types = this.dataSource.filteredData[index].category_types;
                this.dataSource.filteredData[index] = result;
                // this.dataSource.filteredData[index].category_types = this.category_types;

                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
                console.log(this.dataSource);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditCategoryComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getCategories();
    }

}
