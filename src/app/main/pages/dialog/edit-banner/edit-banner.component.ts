import {Component, OnInit} from '@angular/core';
import {BannerModel} from "../../../../../models/banner.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-edit-banner',
    templateUrl: './edit-banner.component.html',
    styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {
    data: BannerModel;
    icon: string;
    bannerForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditBannerComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.bannerForm.controls;
    }



    addNewBanner() {
        // tslint:disable-next-line:prefer-const
        let extention = this.f.image.value.split('?')[0].split('.').pop();
        if(extention === 'mp4'){
            this.f.type.setValue(2);
        }else{
            this.f.type.setValue(1);

        }
        let banner: BannerModel = this.bannerForm.value as BannerModel;
        this.restService.addBanner(banner).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The banner has been added successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
                this.appService.image.next('');
                this.dialogRef.close(res.data);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        // banner.image =  this.f.image.value;
        let extention = this.f.image.value.split('?')[0].split('.').pop();
        if(extention === 'mp4'){
              this.f.type.setValue(2);
        }else{
            this.f.type.setValue(1);

        }
        let banner: BannerModel = this.bannerForm.value as BannerModel;
        this.restService.updateBanner(banner).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The banner has been updated successfully', '');
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.bannerForm = this._formBuilder.group({
            banner_id: [null],
            description_en: [null],
            description_ar: [null],
            type: [null],
            active: [null],
            image: [null, [Validators.required]],
        });

    }



    fileProgress(fileInput: any) {
        let fileData = <File>fileInput.target.files;
        let extention = fileData[0].name.split('?')[0].split('.').pop();
        if (extention === 'mp4') {
            this.onUploadVideo(fileData[0]);
        } else {
            this.uploadFile(fileData[0]);
        }
    }

    onUploadVideo(fileInput) {
        let formData = new FormData();
        formData.append('mp4', fileInput);
        this.restService.uploadVideo(formData).then((res) => {
            if(res.code === 200){
                this.f.image.setValue(res.data);
            }
        });
    }

    uploadFile(file) {
        let formData = new FormData();
        formData.append('images', file);
        this.restService.uploadImage(formData).then((res) => {
            if (res.code === 200) {
                this.f.image.setValue(res.data.urls[0]);
            } else {
                this.toastr.error(res.message, '');
            }


        }).catch((err: HttpErrorResponse) => {

        });
    }


    close() {
        this._dialog.closeAll();
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.bannerForm.patchValue(this.data);
        }


    }


}
