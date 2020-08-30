import {UserModel} from './user.model';

export interface KitchenModel {
  kitchen_id: string;
  description_en: string;
  description_ar: string;
  featured: number;
  name_en: string;
  name_ar: string;
  name?: string;
  image: string;
  user_id: string;
  category_id: string;
  final_quality_rate?: number;
  final_delivery_rate?: number;
  final_value_rate?: number;
  final_order_pakaging_rate?: number;
  final_rate?: number;
  served_count?: number;
  end_time: Date;
  start_time: Date;
  active: number;
  menus?: MenuModel[];
  // reviews?: ReviewsModel[];
  user?: UserModel;

}


export interface MenuModel {
  menu_id: string;
    name_en: string;
    name_ar: string;
  active: number;
  // Meals: MealModel[];
}
