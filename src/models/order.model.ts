import {KitchenModel} from "./kitchen.model";
import {UserModel} from "./user.model";
import {CityModel, MealModel} from "./meal.model";
import {ProductModel} from "./product.model";

export interface OrderModel {
    order_id: string;
    user_id: string;
    address_id: string;
    date: string;
    kitchen_id: string;
    status: number;
    isRate: number;
    total_price: number;
    delivery_charges: number;
    transaction_id: string;
    payment_type: number;
    tax: number;
    discount: number;
    subtotal: number;
    comments: string;
    order_timing: string;
    kitchen: KitchenModel;
    user: UserModel;
    address: AddressModel;
    crowdmarket_sub_orders: SubOrderModel[];


}

export interface AddressModel {
    address_id: number;
    city_id: string;
    area: string;
    type: string;
    apartment: string;
    additional: string;
    user_id: string;
    street: string;
    building: string;
    floor: string;
    phone: string;
    landline: string;
    city: CityModel;
}



export interface  SubOrderModel {
    sub_order_id: string;
    order_id: string;
    subscription_id: string;
    offer_id: string;
    meal_id: string;
    quantity: string;
    product: ProductModel[];
}



