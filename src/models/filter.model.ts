export class FilterModel {
    keyword: string;
    category_id?: number;
    sub_category_id?: number;
    min_price?: number;
    max_price?: number;
    date?: Date;
    monthly_new?: boolean;
    sort_by?: number;
    rating?: number;
    longitude?: number;
    latitude?: number;
    user_type?: string;
    deal_id?: string;
    page = 0;

}
