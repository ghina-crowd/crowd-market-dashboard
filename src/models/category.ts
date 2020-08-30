
export interface Category {
  category_id: string;
  name_en: string;
  name_ar: string;
  active: number;
  image: string;
  color: string;
  category_types: CategoryTypeModel[];
}


export interface CategoryTypeModel {
    category_type_id: number;
    type_id: number;
    category_id: number;
    type: TypeModel;

}


export class UploadModel {
    image: string;
}

export interface TypeModel {
    type_id: string;
    name_en: string;
    name_ar: string;
    name?: string;
    active: string;
}