import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../../../../models/order.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../services/data.service";
import {PaginationModel} from "../../../../../models/pagination.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    data: OrderModel;
    displayedColumns: string[] = ['product',  'type' , 'store' , 'quantity',  'price', 'sub_total'];
    dataSource: any;
    filterForm: FormGroup;
    pagination = new PaginationModel();
    constructor(private fb: FormBuilder,
                private restService: DataService,
                public dialogRef: MatDialogRef<OrderDetailsComponent>,

    ) {
    }



    prepareForm() {
        this.filterForm = this.fb.group({
            meal_delivery_time: ['', [Validators.required]],
        });
    }



    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.data.crowdmarket_sub_orders);
        this.prepareForm();

    }

}
