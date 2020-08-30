import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {MatDialog} from '@angular/material';
import {DataService} from "../../../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {UploadModel} from "../../../../models/category";
import {AppService} from "../../../app.service";

@Component({
    selector: 'app-cropped-image',
    templateUrl: './cropped-image.component.html',
    styleUrls: ['./cropped-image.component.scss']
})
export class CroppedImageComponent implements OnInit {
    @Input() image = '';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    isInsideDialog = true;
    file: any;
    @Output() url: EventEmitter<string> = new EventEmitter();


    constructor(
        private dialog: MatDialog,
        private toastr: ToastrService,
        private appService: AppService,
        private restService: DataService) {


    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.file = new File([event.base64], "hello world.txt", {type: "text/plain;charset=utf-8"});

    }

    fileChangeEvent(event: any): void {

            this.imageChangedEvent = event;

    }



    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    onSubmit() {

        // this.matDialogRef.beforeClose().subscribe(() => this.matDialogRef.close(this.croppedImage));
        // this.dialog.closeAll();
    }


    uploadFile() {
        let upload = new UploadModel();
        upload.image = this.croppedImage;
        this.restService.uploadFile(upload).then((res) => {
            if (res.code === 200) {
                this.restService.image = res.data.url;
                this.image = res.data.url;
                this.appService.image.next(res.data.url);
                this.imageChangedEvent = '';
                this.croppedImage = '';
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    uploadTextFile() {
        let formData = new FormData();
        formData.append('base64', this.file);
        console.log(formData.get('base64'));
        this.restService.uploadTextFile(formData).then((res) => {
            if (res.code === 200) {
                this.url.emit(res.data.url);
            } else {
            }
        }).catch((err: HttpErrorResponse) => {
            this.toastr.error('The image is too large', '');
            console.log('The image is too large');

        });
    }


    ngOnInit() {
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }


}
