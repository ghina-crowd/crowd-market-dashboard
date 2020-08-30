import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {EditUnitComponent} from "../dialog/edit-unit/edit-unit.component";
import {MatTableDataSource} from "@angular/material/table";
import {UnitesModule} from "./unites.module";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {UnitModel} from "../../../../models/product.model";


@Component({
  selector: 'app-unites',
  templateUrl: './unites.component.html',
  styleUrls: ['./unites.component.scss']
})
export class UnitesComponent implements OnInit {


    displayedColumns: string[] = ['unit_id', 'name_en', 'name_ar',  'action'];
    dataSource: any;


    constructor(private restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditUnitComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openEditDialog(unit: UnitModel) {
        let dialog = this.dialog.open(EditUnitComponent);
        dialog.componentInstance.data = unit;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(unit);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    getUnites() {
        // tslint:disable-next-line:prefer-const
        this.restService.getUnites().then((res) => {
            if (res.code === 200) {
                this.dataSource = new MatTableDataSource(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    removeUnit(data: UnitModel) {
        // tslint:disable-next-line:prefer-const
        this.restService.removeUnit(data.unit_id).then((res) => {
            if (res.code === 200) {
                this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item.unit_id != data.unit_id);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
                Swal.fire(
                    '',
                    '',
                    'success'
                );
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeRemove(item: UnitModel) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to remove this unite ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.removeUnit(item);

                }
            });
    }


    ngOnInit() {
        this.getUnites();

    }
}
