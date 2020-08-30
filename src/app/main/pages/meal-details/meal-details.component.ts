import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../app.service";
import {ActivatedRoute} from "@angular/router";
import {MealModel} from "../../../../models/meal.model";

@Component({
    selector: 'app-meal-details',
    templateUrl: './meal-details.component.html',
    styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
    details: MealModel;
    constructor(private _formBuilder: FormBuilder,
                private restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService,
                public appService: AppService,
                private route: ActivatedRoute
    ) {
    }


    getMeal(id) {
        // this.restService.getMeal(id).then((res) => {
        //     if (res.code === 200) {
        //         this.details = res.data;
        //     } else {
        //         this.toastr.error(res.message, '');
        //     }
        // }).catch((err: HttpErrorResponse) => {
        // });
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getMeal(params.id);
        });
    }

}
