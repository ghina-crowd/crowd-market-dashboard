import {Component, OnInit} from '@angular/core';
import {DealModel} from "../../../../models/deal.model";
import {PageEvent} from "@angular/material/paginator";
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../../app.service";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {PaginationModel} from "../../../../models/pagination.model";

@Component({
    selector: 'app-complains',
    templateUrl: './complains.component.html',
    styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent implements OnInit {

    deals: DealModel[];

    displayedColumns: string[] = ['id', 'name', 'email', 'message'];
    dataSource: any;
    page = 0;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    filter = new PaginationModel();



    constructor(private _fuseConfigService: FuseConfigService,
                private _formBuilder: FormBuilder,
                private appService: AppService,
                private restService: DataService,
                private toastr: ToastrService,
                private router: Router) {

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    getContactus() {

        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.restService.getContactus(this.filter).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.dataSource = new MatTableDataSource(res.data.Contacts);
            } else {
                this.toastr.error(res.message, '');
            }


        }).catch((err: HttpErrorResponse) => {

        });
    }




    ngOnInit() {
        this.getContactus();
    }

}
