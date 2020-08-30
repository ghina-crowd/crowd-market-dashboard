import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';


@Component({
    selector: 'app-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

    displayedColumns: string[] = ['request_id', 'request_from', 'phone', 'type', 'status', 'date', 'action'];
    dataSource: any;
    page = 0;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    decoded: any;


    constructor(private restService: DataService,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService) {

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }







    ngOnInit() {
    }

}
