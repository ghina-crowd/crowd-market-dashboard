import { Component, OnInit } from '@angular/core';
import {BannerModel} from "../../../../models/banner.model";
import {FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {EditBannerComponent} from "../dialog/edit-banner/edit-banner.component";
import {EditCityComponent} from "../dialog/edit-city/edit-city.component";
import {CityModel} from "../../../../models/meal.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {


    displayedColumns: string[] = ['banner_id', 'desc_en', 'desc_ar', 'status',  'image' ,  'action'];
    dataSource: any;
    page = 0;
    banners: BannerModel[] = [];
    length: number;
    pageSize = 12;
    id: number;
    decoded: any;

    constructor(private restService: DataService,
                private appService: AppService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }



    getBanners() {
        this.restService.getBanners().then((res) => {
            if (res.code === 200) {
                this.dataSource = new MatTableDataSource(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
        });
    }



    openAddDialog() {
        let dialog = this.dialog.open(EditBannerComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openEditDialog(data: BannerModel){
        let dialog = this.dialog.open(EditBannerComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    removeBanner(data: BannerModel) {
        // tslint:disable-next-line:prefer-const
        this.restService.removeBanner(data.banner_id).then((res) => {
            if (res.code === 200) {
                this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item.banner_id != data.banner_id);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
                Swal.fire(
                    'Delete',
                    'The banner has been deleted successfully',
                    'success'
                );
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeRemove(item: BannerModel) {
        let status: string;

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this banner ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.removeBanner(item);

                }
            });
    }


    onUpload(fileInput) {
        let fileData = <File>fileInput.target.files[0];
        let formData = new FormData();
        formData.append('mp4', fileData);
        this.restService.uploadVideo(formData).then((res) => {
        });
    }


    ngOnInit() {
        this.getBanners();
    }

}
