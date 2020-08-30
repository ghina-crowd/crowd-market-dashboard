export interface ProductModel {
    product_id: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    price: number;
    new_price: number;
    image: number;
    max_quantity: number;
    type: number;
    active: number;
    discount: number;
    category_id: number;
    unit_id: number;
    products?: string[];

}

export interface UnitModel {
    unit_id: string;
    name_en: string;
    name_ar: string;
}


export interface ConstrainsModel {
    minOrder: number;
    shippingCost: number;
}

