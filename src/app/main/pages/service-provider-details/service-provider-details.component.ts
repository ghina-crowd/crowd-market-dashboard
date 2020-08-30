import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../models/user.model";
import {ProviderModel} from "../../../../models/provider.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-service-provider-details',
  templateUrl: './service-provider-details.component.html',
  styleUrls: ['./service-provider-details.component.scss']
})
export class ServiceProviderDetailsComponent implements OnInit {
user: any;
company: ProviderModel;
  constructor(private activatedRoute: ActivatedRoute ,
              public restService: DataService,
              private toastr: ToastrService) { }


    getServiceProviderInfo(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getServiceProviderInformationByID(id).then(res => {
             this.company = res.data.company as ProviderModel;
             this.user = res.data ;
            if (res.code === 200) {

            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    activeBlock(data: UserModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        this.restService.activeBlockUser(data).then((res) => {
            if (res.code === 200) {
                this.user.active = status;
                Swal.fire(
                    'Update!',
                    'the user status has been updated.',
                    'success'
                );
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeActiveBlock(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        } else if (status == 2) {
            statusName = 'block';
        } else {
            statusName = 'active';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(item, status);

                }
            });
    }


    ngOnInit() {

        this.activatedRoute.params.subscribe(paramsId => {
            this.getServiceProviderInfo(paramsId.id);


        });
  }

}
