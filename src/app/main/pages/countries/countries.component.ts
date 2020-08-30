import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {CityModel, CountryModel} from "../../../../models/meal.model";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {CountryComponent} from "../dialog/country/country.component";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

    displayedColumns: string[] = ['country_id', 'name_en', 'name_ar',  'image' , 'action'];
    dataSource: any;


    constructor(private restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        let dialog = this.dialog.open(CountryComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openEditDialog(country: CountryModel) {
        let dialog = this.dialog.open(CountryComponent);
        dialog.componentInstance.data = country;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(country);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    getCountries() {
        // tslint:disable-next-line:prefer-const
        this.restService.getCountries().then((res) => {
            if (res.code === 200) {
                this.dataSource = new MatTableDataSource(res.data);
                // this.branches = res.data.company_branches;

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    removeCity(data: CityModel, value) {
        // tslint:disable-next-line:prefer-const
        data.active = value;
        this.restService.updateCity(data).then((res) => {
            if (res.code === 200) {

                Swal.fire(
                    ':)',
                    '',
                    'success'
                );
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeRemove(item: CityModel, value) {
        let status: string;
        if (value == 1) {
            status = 'active';
        } else {
            status = 'unactive';
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + status + ' the city ?',
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
        this.getCountries();

    }
}
