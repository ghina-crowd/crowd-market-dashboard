import {Component, OnInit} from '@angular/core';
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {KitchenModel} from "../../../../models/kitchen.model";
import {OrderDetailsComponent} from "../dialog/order-details/order-details.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderModel} from "../../../../models/order.model";
import * as jwt_decode from 'jwt-decode';
import {OrderDetailsStoreComponent} from "../dialog/order-details-store/order-details-store.component";


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    kitchen_id: number;
    dataSource: any;
    displayedColumns: string[] ;

    orders: OrderModel[] = [];
    kitchens: KitchenModel[] = [];
    allkitchens: KitchenModel[] = [];
    filter = new PaginationModel();
    pageEvent: PageEvent;
    pagination = new PaginationModel();
    length: number;
    pageSize = 12;
    id: number;
    profit: number;
    decoded: any;
    filterForm: FormGroup;

    constructor(private restService: DataService,
                private fb: FormBuilder,
                private appService: AppService,
                private dilaog: MatDialog,
                private toastr: ToastrService) {

    }

    get f() {
        return this.filterForm.controls;
    }


    applyFilter() {
        this.filter = this.filterForm.value as PaginationModel;
        this.filter.page = '0';
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getOrders();
    }


    openDialogOrder(data: OrderModel) {
        let dialog = this.dilaog.open(OrderDetailsComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index].status = result.status;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    openDialogStoreOrder(data: OrderModel) {
        let dialog = this.dilaog.open(OrderDetailsStoreComponent);
        dialog.componentInstance.data = data;
    }

    updateOrders(data, status) {
        this.pagination.status = status;
        this.pagination.order_id = data.order_id;
        this.pagination.address_id = data.address.address_id;
        this.pagination.farmer_id = data.farmer_id;
        this.restService.updateOrder(this.pagination).then((res) => {
            if (res.code === 200) {
                if(status === 2){
                    data.status = 2;
                    this.toastr.success('The Order has been completed', '');
                }else{
                    data.status = 3;
                    this.toastr.success('The Order has been canceled', '');
                }

            } else {
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    getOrders() {
        if (this.pageEvent) {
            this.filter.page = (this.pageEvent.pageIndex).toString();
        }
        this.restService.getOrders(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.orders = res.data.Orders;
                this.dataSource = new MatTableDataSource(this.orders);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    getStoreOrders() {
        if (this.pageEvent) {
            this.filter.page = (this.pageEvent.pageIndex).toString();
        }
        this.restService.getStoreOrders(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.orders = res.data.Orders;
                this.dataSource = new MatTableDataSource(this.orders);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.filterForm = this.fb.group({
            startDate: [''],
            endDate: [''],
            status: [''],
        });
    }


    ngOnInit() {
        this.decoded = jwt_decode(localStorage.getItem('auth_token_crowd_admin'));
        this.filter.page = '0';
        this.prepareForm();
        if (this.decoded.user_type === 'admin' || this.decoded.user_type === 'driver') {
            this.displayedColumns = ['id', 'transaction_id', 'products', 'order_timing', 'status', 'payment', 'action'];
            this.getOrders();
        } else {
            this.displayedColumns = ['id', 'transaction_id', 'products', 'order_timing', 'status',  'action'];

            this.getStoreOrders();
        }
    }


}
