export interface AccountModel {
  pk_account_id: number;
  owner_name: string;
  cvc: string;
  expiry_date: string;
  card_number: string;
  fk_user_id: number;
  type:string;

}
