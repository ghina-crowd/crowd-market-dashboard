import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/pages/authentication/login/login.module';
import {RegisterModule} from 'app/main/pages/authentication/register/register.module';
import {ForgotPasswordModule} from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import {ResetPasswordModule} from 'app/main/pages/authentication/reset-password/reset-password.module';
import {ComingSoonModule} from 'app/main/pages/coming-soon/coming-soon.module';
import {Error404Module} from 'app/main/pages/errors/404/error-404.module';
import {Error500Module} from 'app/main/pages/errors/500/error-500.module';
import {ProfileModule} from 'app/main/pages/profile/profile.module';
import {SearchClassicModule} from 'app/main/pages/search/classic/search-classic.module';
import {SearchModernModule} from 'app/main/pages/search/modern/search-modern.module';
import {UsersModule} from "./users/users.module";
import {AddUserModule} from "./add-user/add-user.module";
import {AllServiceProviderModule} from "./all-service-provider/all-service-provider.module";
import {ServiceProviderDetailsModule} from "./service-provider-details/service-provider-details.module";
import {ReviewsModule} from "./reviews/reviews.module";
import {MyRequestsModule} from "./my-requests/my-requests.module";
import {EditServiceProviderModule} from "./edit-service-provider/Edit-service-provider.module";
import {ComplainsModule} from "./complains/complains.module";
import {KitchenCountriesModule} from "./kitchen-countries/kitchen-countries.module";
import {NewKitchenComponent} from './new-kitchen/new-kitchen.component';
import {NewKitchenModule} from "./new-kitchen/new-kitchen.module";
import {KitchensModule} from "./kitchens/kitchens.module";
import {CroppedImageComponent} from "./cropped-image/cropped-image.component";
import {EditCategoryComponent} from "./dialog/edit-category/edit-category.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ImageCropperModule} from "ngx-image-cropper";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";
import {CitiesModule} from "./cities/cities.module";
import {EditCityComponent} from './dialog/edit-city/edit-city.component';
import {MealModule} from "./meal/meal.module";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { NewMealComponent } from './new-meal/new-meal.component';
import {NewMealModule} from "./new-meal/new-meal.module";
import {MealDetailsModule} from "./meal-details/meal-details.module";
import {BannerModule} from "./banner/banner.module";
import { EditBannerComponent } from './dialog/edit-banner/edit-banner.component';
import {ProfitModule} from "./profits/profit.module";
import {OrdersModule} from "./orders/orders.module";
import { OrderDetailsComponent } from './dialog/order-details/order-details.component';
import { ImageCroppedDialogComponent } from './dialog/image-cropped-dialog/image-cropped-dialog.component';
import { EditUnitComponent } from './dialog/edit-unit/edit-unit.component';
import {UnitesModule} from "./unites/unites.module";
import {CountriesModule} from "./countries/countries.module";
import { CountryComponent } from './dialog/country/country.component';
import {NewBoxModule} from "./new-box/new-box.module";
import { EditTypeComponent } from './dialog/edit-type/edit-type.component';
import {TypeModule} from "./types/type.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { OrderDetailsStoreComponent } from './dialog/order-details-store/order-details-store.component';
import {CoponesModule} from "./cobones/copones.module";
import { AddCouponeComponent } from './dialog/add-coupone/add-coupone.component';

@NgModule({
    imports: [
        UsersModule,
        AddUserModule,
        AllServiceProviderModule,
        ServiceProviderDetailsModule,
        ReviewsModule,
        MyRequestsModule,
        EditServiceProviderModule,
        ComplainsModule,
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        ComingSoonModule,
        Error404Module,
        Error500Module,
        ProfileModule,
        UnitesModule,
        SearchClassicModule,
        SearchModernModule,
        CoponesModule,

        // Aklbetna
        KitchenCountriesModule,

        KitchensModule,
        NewKitchenModule,
        ImageCropperModule,
        CountriesModule,
        ProfitModule,
        TypeModule ,
        OrdersModule,
        NewBoxModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatRadioModule,
        RouterModule,

        MatGoogleMapsAutocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAl_KkpIB-kNu2GIhc4Kxejd0DDESQWMRM',
            libraries: ['places']
        }),
        NgMultiSelectDropDownModule.forRoot(),
        CitiesModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MealModule,
        NewMealModule,
        MealDetailsModule,
        BannerModule,
        // NgxMaterialTimepickerModule.setLocale('ar-AE')


    ],
    exports: [],
    providers: [],
    entryComponents: [EditCategoryComponent, EditCityComponent , OrderDetailsStoreComponent , AddCouponeComponent ,
          EditBannerComponent , OrderDetailsComponent , ImageCroppedDialogComponent , EditUnitComponent , CountryComponent , EditTypeComponent],
    declarations: [CroppedImageComponent, NewKitchenComponent,
        EditCategoryComponent, EditCityComponent,
        NewMealComponent, EditBannerComponent, OrderDetailsComponent,
        ImageCroppedDialogComponent, EditUnitComponent, CountryComponent, EditTypeComponent, OrderDetailsStoreComponent, AddCouponeComponent,

    ]
})
export class PagesModule {

}
