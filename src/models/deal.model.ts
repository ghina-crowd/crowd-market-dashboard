import {UserModel} from './user.model';
import {ProviderModel} from './provider.model';

export interface DealModel {
    active: number;
    company: ProviderModel;
    deal_id: string;
    deal_title_en: string;
    deal_title_ar: string;
    branch_id: string;
    sub_category_id: number;
    details: string;
    end_time: string;
    details_ar: string;
    details_en: string;
    prior_booking_message: string;
    link_for_booking: string;
    prior_booking_message_ar: string;
    terms_and_conditions: string;
    purchased_voucher: string;
    is_prior_booking: string;
    final_rate: number;
    images: string[];
    conditions: ConditionsModel[];
    info: InformationModel[];
    is_monthly: number;
    latitude: string;
    location_address: string;
    longitude: string;
    main_image: string;
    deal_Inclusions_ar: string;
    deal_exclusions_ar: string;
    terms_and_conditions_ar: string;
    purchased_voucher_ar: string;
    new_price: number;
    pre_price: number;
    reviews: ReviewModel[];
    reviews_count: number;
    shop_category_id: string;
    short_detail: string;
    link_attachment: string;
    attache_link: string;
    attache: string;
    deal_exclusions_link: string;
    deal_exclusions: string;
    deal_Inclusions_link: string;
    deal_Inclusions: string;
    start_time: string;
    count_bought: string;
    sub_deals?: SubdealModel[];
    sub_deal: SubdealModel[];
    deals_infos: InformationModel[];
    deals_conditions?: ConditionsModel[];
    sub_deals_count: number;
    company_id: string;
    action?: string;
}


export interface ReviewModel {
    rating_id?: number;
    deal_id?: string;
    user_id?: number;
    rate: number;
    date?: string;
    comment: string;
    page?: number;
    user_admin?: UserModel;
}

export interface SubdealModel {
    id: string;
    title_en: string;
    title_ar: string;
    pre_price: string;
    new_price: string;
    deal_id?: string;
    count_bought?: string;
    percDiff?: string;


}

export interface ImageModel {
    img_id: string;
    deal_id: string;
    source: string;
}

export interface ConditionsModel {
    details_en: string;
    details_ar: string;
    deal_id: string;
    condition_id: string;

}

export interface InformationModel {
    info_id: string;
    deal_id: string;
    details_en: string;
    details_ar: string;


}

