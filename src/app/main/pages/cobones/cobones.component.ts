import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../services/data.service";
import {CountryComponent} from "../dialog/country/country.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCouponeComponent} from "../dialog/add-coupone/add-coupone.component";
import {CountryModel} from "../../../../models/meal.model";
import {CouponModel} from "../../../../models/coupon.model";

@Component({
    selector: 'app-cobones',
    templateUrl: './cobones.component.html',
    styleUrls: ['./cobones.component.scss']
})
export class CobonesComponent implements OnInit {

    displayedColumns = ['id', 'code', 'start_date', 'end_date', 'max_limit', 'value' , 'active' , 'action'];
    dataSource: any;

    constructor(private restService: DataService ,
                 private dialog: MatDialog) {
    }

    getCoupones() {
        this.restService.getCoupones().then((res) => {
            if (res.code === 200) {
                this.dataSource = new MatTableDataSource(res.data);
            } else {
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    openEditDialog(coupon: CouponModel) {
        let dialog = this.dialog.open(AddCouponeComponent);
        dialog.componentInstance.data = coupon;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(coupon);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }



    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        let dialog = this.dialog.open(AddCouponeComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }



    ngOnInit() {
        this.getCoupones();
    }

}
