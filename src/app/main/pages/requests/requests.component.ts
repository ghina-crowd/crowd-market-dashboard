import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../app.service";
import {NotificationModel} from "../../../../models/notification.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
    page = 0;
    length: number;
    id: number;
    notifications: NotificationModel[] = [];
    pageEvent: PageEvent;


    constructor(public restService: DataService,
                public appService: AppService,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService) {

    }

    getNotification() {
        this.page = this.page + 1;

        if (this.appService.decoded.user_type == 'admin') {
            this.restService.getNotificationsAdmin(this.page);

        } else {
            this.restService.getNotifications(this.page);

        }

    }

    ngOnInit() {
        if (this.appService.decoded.user_type == 'admin') {
            this.restService.getNotificationsAdmin(0);

        } else {
            this.restService.getNotifications(0);

        }
    }

}
