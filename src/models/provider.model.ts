
export interface ProviderModel {
    company_id: string;
    location_name: string;
    company_role: string;
    company_name_en: string;
    company_name_ar: string;
    licence_number: string;
    expiry_date: string;
    number_of_locations: number;
    description_en: string;
    trade_name: string;
    description_ar: string;
    website_link?: string;
    facebook_page?: string;
    instagram_page?: string;
    tax_number: string;
    latitude: number;
    longitude: number;
    target: number;
    url_signed_company_form: string;
    url_trade_license: string;
    url_service_provider_id: string;
    url_owner_photo_with_id: string;
    nature_of_business: string;
    landline_number: string;
    cost_type: string;
    active?: string;
}
