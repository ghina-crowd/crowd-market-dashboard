import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category, TypeModel} from "../../../../../models/category";
import {MatTableDataSource} from "@angular/material/table";
import {IDropdownSettings} from "ng-multiselect-dropdown/multiselect.model";

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    data: Category;
    icon: string;
    categoryForm: FormGroup;
    types: TypeModel[];
    dropdownSettings: IDropdownSettings = {};
    selectedList: string[] = [];


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCategoryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.categoryForm.controls;
    }

    addNewCategory() {
        // tslint:disable-next-line:prefer-const
        this.f.types.setValue(this.selectedList);
        let categoryModel: Category = this.categoryForm.value as Category;
        this.restService.addCategory(categoryModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success( 'The category has been added successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
                this.appService.image.next('');
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        this.f.types.setValue(this.selectedList);
        let categoryModel: Category = this.categoryForm.value as Category;
        categoryModel.image = this.restService.image ? this.restService.image : this.categoryForm.controls.image.value;
        this.restService.updateCategory(categoryModel).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The category has been updated successfully', '');
                this.restService.image = '';
                this.dialogRef.close(res.data);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    prepareForm() {
        this.categoryForm = this._formBuilder.group({
            category_id: [null],
            name_en: [null, [Validators.required]],
            name_ar: [null, [Validators.required]],
            color: [null, [Validators.required]],
            active: [null, [Validators.required]],
            image: [null, [Validators.required]],
            types: [null],

        });

    }

    close(){
        this._dialog.closeAll();
        this.appService.image.next('');
    }

    getTypes() {
        // tslint:disable-next-line:prefer-const
        this.restService.getTypes().then((res) => {
            if (res.code === 200) {
                this.types = res.data;
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    deleteType(item){
        this.restService.removeCategoryType(item.category_type_id).then((res) => {
            if (res.code === 200) {
                this.data.category_types = this.data.category_types.filter(value => value.category_type_id !== item.category_type_id);
                this.selectedList = this.selectedList.filter(value => value != item.type.type_id);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    onItemSelect(item: any) {
        this.selectedList.push(item.type_id);
    }

    onItemDeSelect(data: any) {
        this.selectedList = this.selectedList.filter(item => item != data.type_id);

    }

    onSelectAll(items: any) {
        console.log(items);
    }

    ngOnInit() {
        this.dropdownSettings = {
            singleSelection: false,
            enableCheckAll: false,
            idField: 'type_id',
            textField: 'name_en',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 10,
            allowSearchFilter: true
        };
        this.prepareForm();
        if (this.data) {
            this.categoryForm.patchValue(this.data);
            this.data.category_types.forEach(item =>{
                this.selectedList.push(item.type.type_id);
            });
        }
        this.getTypes();


    }

}
