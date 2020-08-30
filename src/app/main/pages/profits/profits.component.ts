import {Component, OnInit} from '@angular/core';
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {KitchenModel} from "../../../../models/kitchen.model";
import {DatePipe} from "@angular/common";
import {OrderModel} from "../../../../models/order.model";

@Component({
    selector: 'app-profits',
    templateUrl: './profits.component.html',
    styleUrls: ['./profits.component.scss'],
    providers: [DatePipe]

})
export class ProfitsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'transaction_id', 'order_timing',  'total_price', 'delivery_charges', 'final_price', 'payment_type', 'profit'];
    dataSource: any;
    page = 0;
    kitchen_id: number;
    orders: OrderModel[] = [];
    kitchens: KitchenModel[] = [];
    allkitchens: KitchenModel[] = [];
    filter = new PaginationModel();
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    profit: number;
    amount: number;
    decoded: any;
    filterForm: FormGroup;

    constructor(private restService: DataService,
                private fb: FormBuilder,
                public datepipe: DatePipe,
                private appService: AppService,
                private toastr: ToastrService) {

    }

    get f() {
        return this.filterForm.controls;
    }


    filterKitchens(e) {
        let filterValue = e.target.value;
        if (filterValue) {
            this.kitchens = this.allkitchens.filter(item => item.name.toLowerCase().replace(/\s/g, '').includes(filterValue));
        } else {
            this.kitchens = this.allkitchens;
        }
    }


    selectKitchen(value) {
        if (value == 'all') {
            this.kitchen_id = 0;
        } else {
            let kitchen: KitchenModel[] = this.allkitchens.filter(item => item.name === value);
            this.kitchen_id = +kitchen[0].kitchen_id;
        }

    }

    applyFilter() {
        this.filter.page = '0';
        this.filter.startDate = this.datepipe.transform(this.f.startDate.value, 'yyyy-MM-dd');
        this.filter.endDate = this.datepipe.transform(this.f.endDate.value, 'yyyy-MM-dd');

        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.profits();
    }

    getAllKitchen() {
        this.restService.getAllKitchen().then((res) => {
            if (res.code === 200) {
                this.kitchens = res.data;
                this.allkitchens = res.data;
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    profits() {

        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        if(this.appService.decoded.user_type === 'ServicePro'){
              this.filter.kitchen_id = this.appService.decoded.kitchen_id;
        }
        this.filter.status = 2;
        this.restService.profits(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.orders = res.data.Orders;
                this.profit = res.data.finalProfit;
                this.amount = res.data.finalPrice;
                this.dataSource = new MatTableDataSource(this.orders);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.filterForm = this.fb.group({
            endDate: [''],
            startDate: [''],
            kitchen_id: [''],
        });
    }


    ngOnInit() {
        this.filter.page = '0';
        if(this.appService.decoded.user_type === 'admin'){
            // this.getAllKitchen();
        }
        this.prepareForm();
        this.profits();

    }


}
