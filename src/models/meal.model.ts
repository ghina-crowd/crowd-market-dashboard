import {Category, TypeModel} from './category';
import {KitchenModel} from './kitchen.model';

export interface MealModel {
    meal_id: string;
    category_id: string;
    name_en: string;
    name_ar: string;
    name?: string;
    menu_id: string;
    kitchen_id: string;
    description_en: string;
    description_ar: string;
    image: string;
    active: number;
    price_weekly: number;
    type: number;
    featured: number;
    price: number;
    final_rate: number;
    price_monthly: number;
    total_served: number;
    favouriteCount?: number;
    category?: Category;
    kitchen?: KitchenModel;
    savourite?: FavouriteModel;
    Type?: TypeModel;
    menu?: MealModel;
}


export class FavouriteModel {
    favourite_id: string;
    user_id: string;
    meal_id?: string;
    date: string;
    status?: number;
    meal?: MealModel;
}


export interface CityModel {
    city_id: string;
    name_en: string;
    name_ar: string;
    active: string;
}


export interface CountryModel {
    country_id: string;
    name_en: string;
    name_ar: string;
    image: string;
}