import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiService} from './api.service';
import {UserModel} from '../models/user.model';
import {environment} from '../environments/environment';
import {FilterModel} from '../models/filter.model';
import {AccountModel} from '../models/account.model';
import {AppService} from '../app/app.service';
import {ProviderModel} from "../models/provider.model";
import {CategoryModel, SubCategoryModel} from "../models/category.model";
import {RequestModel} from "../models/request.model";
import {ContactModel} from "../models/contact.model";
import {Category, TypeModel, UploadModel} from "../models/category";
import {PaginationModel} from "../models/pagination.model";
import {MenuModel} from "../models/kitchen.model";
import {CityModel, CountryModel} from "../models/meal.model";
import {BannerModel} from "../models/banner.model";
import {OfferModel} from "../models/offer.model";
import {NotificationModel} from "../models/notification.model";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {FarmerModel} from "../models/Farmer.model";
import {ConstrainsModel, ProductModel, UnitModel} from "../models/product.model";
import { CouponModel } from 'models/coupon.model';


@Injectable({
    providedIn: 'root'
})
export class DataService extends ApiService {
    baseUrl = '';
    progressCount = 0;
    data: any;
    image = '';
    notifyCount = 0;
    notifications: NotificationModel[] = [];
    allNotifications: NotificationModel[] = [];
    public notificationCount: BehaviorSubject<number> = new BehaviorSubject<number>(null);


    constructor(public httpClient: HttpClient, private ngZone: NgZone,
                private appService: AppService,
                private toastr: ToastrService) {
        super(httpClient);

        this.baseUrl = environment.baseUrl;
        this.currentProgress.subscribe((progress: string) => {
            this.ngZone.run(() => {
                this.progressCount = Number(progress);
            });
        });
    }


    getCategories() {
        return this.restRequest(null, `${this.baseUrl}/category/admin/get`, null, 'GET');
    }

    getBanners() {
        return this.restRequest(null, `${this.baseUrl}/banner/admin/get`, null, 'GET');
    }

    getMenusByKitchen(id) {
        return this.restRequest(null, `${this.baseUrl}/menu/get/kitchen/${id}`, null, 'GET');
    }

    getProductByID(id) {
        return this.restRequest(null, `${this.baseUrl}/Products/admin/get/${id}`, null, 'GET');
    }

    getAllMeal(id) {
        return this.restRequest(null, `${this.baseUrl}/meals/admin/getByKitchen/${id}`, null, 'GET');
    }

    getMaxOffer() {
        return this.restRequest(null, `${this.baseUrl}/alkabetna/getConstrains`, null, 'GET');
    }

    getOffer(id) {
        return this.restRequest(null, `${this.baseUrl}/offers/get/${id}`, null, 'GET');
    }

    getAllKitchen() {
        return this.restRequest(null, `${this.baseUrl}/kitchen/get`, null, 'GET');
    }


    getUserByType(model: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/user/admin/get/${model.page}/${model.keyword}`, null, 'GET');
    }

    getFarmers(model: PaginationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Farmer/admin/get`, null, type);
    }

    filterFarmers(model: PaginationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Farmer/admin/filter`, null, type);
    }

    getKitchensByCatID(model: PaginationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/category/get/${model.id}/${model.page}`, null, type);
    }

    profits(filter: PaginationModel, type: string = 'POST') {
        return this.restRequest(filter, `${this.baseUrl}/order/admin/get`, null, type);
    }

    getOrders(filter: PaginationModel, type: string = 'POST') {
        return this.restRequest(filter, `${this.baseUrl}/order/admin/get`, null, type);
    }

    getCoupones() {
        return this.restRequest(null , `${this.baseUrl}/coupons/admin/get`, null, 'GET');
    }

    getStoreOrders(filter: PaginationModel, type: string = 'POST') {
        return this.restRequest(filter, `${this.baseUrl}/order/Farmer/get`, null, type);
    }

    getUsers(filter: PaginationModel, type: string = 'POST') {
        return this.restRequest(filter, `${this.baseUrl}/user/admin/get`, null, type);
    }


    getFarmerByID(id) {
        return this.restRequest(null, `${this.baseUrl}/Farmer/admin/get/${id}/0`, null, 'GET');
    }

    updateCategory(model: Category, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/category/admin/update`, null, type);
    }

    updateCountry(model: CountryModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/country/admin/update`, null, type);
    }

    updateOrder(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/order/update`, null, type);
    }

    updateFarmer(model: FarmerModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/Farmer/admin/update`, null, type);
    }

    updateMenu(model: MenuModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/menu/admin/update`, null, type);
    }

    UpdateType(model: TypeModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/type/admin/update`, null, type);
    }

    updateCity(model: CityModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/city/admin/update`, null, type);
    }

    updateType(model: TypeModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/type/admin/update`, null, type);
    }

    updateProduct(model: ProductModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/products/admin/update`, null, type);
    }

    updateOffer(model: OfferModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/offers/update`, null, type);
    }

    updateBanner(model: BannerModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/banner/admin/update`, null, type);
    }

    updateUnit(model: UnitModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/Units/admin/update`, null, type);
    }


    uploadFile(formdata: UploadModel, type: string = 'POST') {
        return this.restRequest(formdata, `${this.baseUrl}/upload/base64`, null, type);
    }

    uploadTextFile(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/upload/base64/file`, null, type, false, formdata);
    }

    uploadImage(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/upload/images`, null, type, false, formdata);
    }

    uploadVideo(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/upload/mp4`, null, type, false, formdata);
    }

    addFarmer(model: FarmerModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Farmer/admin/create`, null, type);
    }

    addBanner(model: BannerModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/banner/admin/create`, null, type);
    }

    addCoupone(model: CouponModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/coupons/admin/create`, null, type);
    }


    addUnit(model: UnitModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Units/admin/create`, null, type);
    }

    addType(model: TypeModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/type/admin/create`, null, type);
    }

    addMenu(model: MenuModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/menu/admin/create`, null, type);
    }

    addCategory(model: Category, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/category/admin/create`, null, type);
    }

    addCountry(model: CountryModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/country/admin/create`, null, type);
    }

    addCity(model: CityModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/city/admin/create`, null, type);
    }

    addProduct(model: ProductModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Products/admin/create`, null, type);
    }

    addBox(model: ProductModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Box/admin/create`, null, type);
    }

    addOffer(model: OfferModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/offers/create`, null, type);
    }

    filterProducts(model: PaginationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/Products/admin/filter`, null, type);
    }

    filterOffers(model: PaginationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/offers/admin/get`, null, type);
    }

    getTypes() {
        return this.restRequest(null, `${this.baseUrl}/type/admin/get`, null, 'GET');
    }

    getDiscount() {
        return this.restRequest(null, `${this.baseUrl}/alkabetna/getConstrains`, null, 'GET');
    }

    removeBanner(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/banner/admin/delete/${id}`, null, type, false);
    }

    removeCategoryType(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/type/admin/category/delete/${id}`, null, type, false);
    }

    removeUnit(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/Units/admin/delete/${id}`, null, type, false);
    }


    home() {
        return this.restRequest(null, `${this.baseUrl}/sub_categories/home`, null, 'GET');
    }


    getIncentives() {
        return this.restRequest(null, `${this.baseUrl}/incentives/admin/get/`, null, 'GET');
    }

    getCities() {
        return this.restRequest(null, `${this.baseUrl}/city/admin/get`, null, 'GET');
    }


    getCountries() {
        return this.restRequest(null, `${this.baseUrl}/country/admin/get`, null, 'GET');
    }

    getUnites() {
        return this.restRequest(null, `${this.baseUrl}/Units/admin/get`, null, 'GET');
    }

    getPurchases() {
        return this.restRequest(null, `${this.baseUrl}/purchase/admin/getAll`, null, 'GET');
    }

    getCompanies() {
        return this.restRequest(null, `${this.baseUrl}/company/admin/get_companies`, null, 'GET');
    }

    getContactus(model: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/contact/admin/get/${model.page}`, null, 'GET');
    }

    getConatrains() {
        return this.restRequest(null, `${this.baseUrl}/CrowdMarket/constrains`, null, 'GET');
    }

    getRequests(page) {
        return this.restRequest(null, `${this.baseUrl}/notifications/admin/get/${page}`, null, 'GET');
    }

    getRequestsSP(page) {
        return this.restRequest(null, `${this.baseUrl}/notifications/users/get/${page}`, null, 'GET');
    }

    getStatisticsAdmin() {
        return this.restRequest(null, `${this.baseUrl}/alkabetna/admin/home`, null, 'GET');
    }

    getStatisticsServicePro() {
        // return this.restRequest(null, `${this.baseUrl}/alkabetna/Sp/home`, null, 'GET');
    }

    getreviewsByID(model: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/meals/reviews/${model.id}/${model.page}`, null, 'GET');
    }

    filterByTypeUser(model: FilterModel) {
        return this.restRequest(null, `${this.baseUrl}/user/admin/users/${model.page}/${model.user_type}`, null, 'GET');
    }


    getUserByID(id) {
        return this.restRequest(null, `${this.baseUrl}/company/get/` + id, null, 'GET');
    }


    getServiceProviderInformationByID(id) {
        return this.restRequest(null, `${this.baseUrl}/user/admin/ServicePro/details/` + id, null, 'GET');
    }

    companies(id, keyword) {
        return this.restRequest(null, `${this.baseUrl}/company/filter/${id}/${keyword}`, null, 'GET');
    }

    getBranchByID(id) {
        return this.restRequest(null, `${this.baseUrl}/company/branch/get/` + id, null, 'GET');
    }


    logout() {
        return this.restRequest(null, `${this.baseUrl}/authenticate/logout`, null, 'GET');
    }

    getAccounts() {
        return this.restRequest(null, `${this.baseUrl}/account/get`, null, 'GET');
    }

    advertising() {
        return this.restRequest(null, `${this.baseUrl}/advertising`, null, 'GET');
    }


    checkToken() {
        return this.restRequest(null, `${this.baseUrl}/authenticate/checktoken`, null, 'GET');
    }

    getAllPurchases() {
        return this.restRequest(null, `${this.baseUrl}/purchase/user/getAll`, null, 'GET');
    }

    getSubCategories() {
        return this.restRequest(null, `${this.baseUrl}/sub_categories/admin/sub_categories`, null, 'GET');
    }

    getRequsests() {
        return this.restRequest(null, `${this.baseUrl}/requests/admin/get/12`, null, 'GET');
    }


    UpdateProvider(model: ProviderModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/company/admin/update`, null, type);
    }

    updateDiscount(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/alkabetna/updateConstrains`, null, type);
    }

    updateConstrains(model: ConstrainsModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/CrowdMarket/update/constrains`, null, type);
    }


    editContactus(model: ContactModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/contact/update`, null, type);
    }

    editCopone(model: CouponModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/coupons/admin/update`, null, type);
    }


    activeBlockUser(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/user/admin/account_status`, null, type);
    }

    updateRequests(model: NotificationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/notifications/admin/read/${model.notification_id}`, null, type);
    }

    updateUserNotification(model: NotificationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/notifications/users/read/${model.notification_id}`, null, type);
    }


    updateSubCategory(model: SubCategoryModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/sub_categories/admin/update`, null, type);
    }


    updateProvider(model: ProviderModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/company/admin/update`, null, type, true);
    }

    forgetPassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/sent_otp_by_email`, null, type);
    }


    creatNewUser(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/user/admin/create`, null, type);
    }

    createRequset(model: RequestModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/requests/admin/create`, null, type);
    }

    createSubCategory(model: SubCategoryModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/sub_categories/admin/create`, null, type);
    }


    AddCategory(model: CategoryModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/categories/admin/create`, null, type);
    }


    addAccount(model: AccountModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/account/create`, null, type);
    }

    login(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/login`, null, type);
    }


    editProfile(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/user/edit_profile`, null, type);
    }

    getProfile() {
        return this.restRequest(null, `${this.baseUrl}/user/profile`, null, 'GET');
    }

    register(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/register`, null, type);
    }


    searchPlaces(keyword: string) {
        return this.restRequest(null, `${this.baseUrl}/maps/places/` + keyword, null, 'GET');
    }

    verification(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/activate`, null, type);
    }

    resetPassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/reset_password`, null, type);
    }

    filterService(model: FilterModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/deals/filter`, null, type);
    }


    updateNotification(data: NotificationModel) {
        if (data.read == 0) {
            data.read = 1;
            if (data.user_id === 'admin') {
                this.updateRequests(data).then((res) => {
                    if (res.code === 200) {
                        this.notificationCount.subscribe(value => {
                            this.notificationCount.next(value - 1);

                        })

                    } else {
                        this.toastr.error(res.message, '');
                    }
                }).catch((err: HttpErrorResponse) => {

                });
            } else {
                this.updateUserNotification(data).then((res) => {
                    if (res.code === 200) {
                        this.notificationCount.subscribe(value => {
                            this.notificationCount.next(value - 1);

                        })
                    } else {
                        this.toastr.error(res.message, '');
                    }
                }).catch((err: HttpErrorResponse) => {

                });
            }
        }
    }


    getNotifications(page) {
        this.getRequestsSP(page).then((res) => {
            if (res.code === 200) {
                this.notifications = res.data.notifications;

                if (page == 0) {
                    this.allNotifications = res.data.notifications;

                } else {
                    this.notifications.forEach(item => {
                        this.allNotifications.push(item);
                    })
                }
                this.notifyCount = res.data.unread;
                this.notificationCount.next(this.notifyCount);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }

    getNotificationsAdmin(page) {
        this.getRequests(page).then((res) => {
            if (res.code === 200) {
                this.notifications = res.data.notifications;
                this.notifyCount = res.data.unread;
                this.notificationCount.next(this.notifyCount);
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {

        });
    }


}
