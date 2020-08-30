export interface CategoryModel {
    name_en: string;
    name_ar?: string;
    shop_category_id: number;
    shop_sub_categories?: SubCategoryModel[];
    active: number;
    icon?: string;
}

export interface SubCategoryModel {
    sub_category_id: number;
    sub_name_en: string;
    sub_name_ar: string;
    active: string;
    shop_category_id: number;
    shop_category?: CategoryModel;

}

