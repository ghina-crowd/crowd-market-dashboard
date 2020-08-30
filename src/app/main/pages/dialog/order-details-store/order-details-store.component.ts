import { Component, OnInit } from '@angular/core';
import {OrderModel} from "../../../../../models/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationModel} from "../../../../../models/pagination.model";
import {DataService} from "../../../../../services/data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-order-details-store',
  templateUrl: './order-details-store.component.html',
  styleUrls: ['./order-details-store.component.scss']
})
export class OrderDetailsStoreComponent implements OnInit {

    data: OrderModel;
    displayedColumns: string[] = ['product',  'type' ,  'quantity'];
    dataSource: any;
    filterForm: FormGroup;
    pagination = new PaginationModel();
    constructor(private fb: FormBuilder,
                private restService: DataService,
                public dialogRef: MatDialogRef<OrderDetailsStoreComponent>,

    ) {
    }


    prepareForm() {
        this.filterForm = this.fb.group({
            meal_delivery_time: ['', [Validators.required]],
        });
    }


    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.data.crowdmarket_sub_orders);

    }

}
