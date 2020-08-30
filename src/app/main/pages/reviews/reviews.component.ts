import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DealModel, ReviewModel} from "../../../../models/deal.model";
import {PageEvent} from "@angular/material/paginator";
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../../app.service";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import * as jwt_decode from 'jwt-decode';
import {FilterModel} from "../../../../models/filter.model";
import {PaginationModel} from "../../../../models/pagination.model";


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {



    deals: DealModel[];

    displayedColumns: string[] = ['rating_id', 'name', 'comment' ,   'order_pakaging_rate' , 'value_rate' , 'delivery_rate' , 'quality_rate'  ,'date'  ];
    dataSource: any;
    page = 0 ;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    mealID: string;
    decoded: any;
    pagination = new PaginationModel();


  constructor(private _fuseConfigService: FuseConfigService,
              private _formBuilder: FormBuilder,
              private appService: AppService,
              private restService: DataService,
              private toastr: ToastrService,
              private  activatedRoute: ActivatedRoute,
              private router: Router) { }

    // applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    // removeReview(data){
    //     // tslint:disable-next-line:prefer-const
    //     // this.restService.removeReview(data.rating_id).then((res) => {
    //     //     if (res.code === 200) {
    //     //         this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item.rating_id != data.rating_id);
    //     //         this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    //     //
    //     //         Swal.fire(
    //     //             'Deleted!',
    //     //             'Your review has been deleted.',
    //     //             'success'
    //     //         );
    //     //     } else {
    //     //         this.toastr.error(res.message, '');
    //     //     }
    //     // }).catch((err: HttpErrorResponse) => {
    //     //
    //     // });
    // }
    //
    //
    // confirmeRemove(item) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'Are you sure you want to delete the review ?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, keep it'
    //     })
    //         .then(result => {
    //             if (result.value) {
    //                 this.removeReview(item);
    //
    //             }
    //         });
    // }
    //

    getReviews() {
        // tslint:disable-next-line:prefer-const
        if(this.pageEvent){
            this.page = this.pageEvent.pageIndex;
        }
        this.restService.getreviewsByID(this.pagination).then(res => {
            if (res.code === 200) {
                this.length = res.data.count;
                this.dataSource =  new MatTableDataSource(res.data.reviews);

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


  ngOnInit() {
      this.decoded = jwt_decode(localStorage.getItem('auth_token_crowd_admin'));

      this.activatedRoute.params.subscribe(paramsId => {
          this.mealID = paramsId.id;
          this.pagination.id =  paramsId.id;
          this.getReviews();
      });
  }

}
