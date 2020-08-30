import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {EditCityComponent} from "../dialog/edit-city/edit-city.component";
import {MatTableDataSource} from "@angular/material/table";
import {CityModel} from "../../../../models/meal.model";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {EditTypeComponent} from "../dialog/edit-type/edit-type.component";
import {TypeModel} from "../../../../models/category";

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
    displayedColumns: string[] = ['type_id', 'name_en', 'name_ar', 'status', 'action'];
    dataSource: any;


    constructor(private restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditTypeComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openEditDialog(type: TypeModel) {
        let dialog = this.dialog.open(EditTypeComponent);
        dialog.componentInstance.data = type;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(type);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    getTypes() {
        // tslint:disable-next-line:prefer-const
        this.restService.getTypes().then((res) => {
            if (res.code === 200) {
                this.dataSource = new MatTableDataSource(res.data);
                // this.branches = res.data.company_branches;

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    removeCity(data: TypeModel, value) {
        // tslint:disable-next-line:prefer-const
        data.active = value;
        this.restService.updateType(data).then((res) => {
            if (res.code === 200) {

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeRemove(item: TypeModel, value) {
        let status: string;
        if (value == 1) {
            status = 'active';
        } else {
            status = 'unactive';
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + status + ' the type ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + status + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.removeCity(item, value);

                }
            });
    }


    ngOnInit() {
        this.getTypes();

    }

}
