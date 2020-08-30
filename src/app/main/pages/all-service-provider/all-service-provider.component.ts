import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {ProviderModel} from "../../../../models/provider.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-all-service-provider',
    templateUrl: './all-service-provider.component.html',
    styleUrls: ['./all-service-provider.component.scss']
})
export class AllServiceProviderComponent implements OnInit {
    companies: ProviderModel[];
    displayedColumns: string[] = ['company_id', 'company_name_en', 'company_name_ar', 'location_name', 'user_admin', 'action'];
    page = 0;
    dataSource: any;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    keyword = 'all';

    constructor(private restService: DataService,
                private toastr: ToastrService) {
    }

    applyFilter(filterValue: string) {
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        this.keyword = filterValue ? filterValue : 'all';
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getCompanies(this.keyword);
    }

    getCompanies(keyword) {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.restService.companies(this.page , keyword ).then((res) => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.dataSource = new MatTableDataSource(res.data.companies);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }



    ngOnInit() {
        this.getCompanies('all');
    }

}
