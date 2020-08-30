import {KitchenModel} from "./kitchen.model";

export interface OfferModel {
  offer_id: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image: string;
    status: number;
    type: number;
    price: number;
    kitchen: KitchenModel;
}