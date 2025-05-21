export interface OrderCustomer {
  email: string;
  phone: string;
  firstname_invoice: string;
  surname_invoice: string;
  street_invoice: string;
  city_invoice: string;
  state_invoice: string;
  zip_invoice: string;
  country_id_invoice: string;
  postal_yn: '0' | '1';
  firstname_postal?: string;
  surname_postal?: string;
  street_postal?: string;
  city_postal?: string;
  state_postal?: string;
  zip_postal?: string;
  country_id_postal?: string;
  company_yn: '0' | '1';
  company?: string;
  ico?: string;
  dic?: string;
  vat_payer_yn: '0' | '1';
  pricelist_name?: string;
  pricelist_percent?: string;
  customer_note?: string;
}

export interface OrderProduct {
  product_id?: number;
  option_set_id?: number;
  type?: string;
  uuid?: string;
  parent_uuid?: string | null;
  code: string;
  code_supplier?: string | null;
  supplier?: string | null;
  ean?: string | null;
  title: string;
  adult_yn?: boolean;
  unit: string;
  length?: string | null;
  length_unit?: string | null;
  quantity: number;
  price_per_unit: number;
  price_per_unit_with_vat?: number;
  price_per_unit_without_vat?: number;
  price: number;
  price_with_vat?: number;
  price_without_vat?: number;
  vat: number;
  buy_price?: number;
  recycling_fee?: string | null;
  weight?: number;
  availability?: string;
  stock_position?: string | null;
  invoice_info?: string;
  parameters?: Array<{
    name: string;
    value: string;
  }>;
  configurations?: any[];
  categories?: Array<{
    category_id: number;
    code: string;
  }>;
  image_url?: string;
}

export interface OrderDimensions {
  width: string | null;
  length: string | null;
  height: string | null;
}

export interface OrderQuantityDiscount {
  amount: string;
  type: 'price' | 'percent';
}

export interface OrderShipment {
  id?: number;
  code: string | null;
  name: string;
  price: number;
  price_with_vat?: number;
  price_without_vat?: number;
  vat: number;
  affiliate_id?: string;
  affiliate_name?: string;
  type?: string;
  packeta_carrier_id?: number;
}

export interface OrderPayment {
  id?: number;
  code: string;
  name: string;
  price: number;
  price_with_vat?: number;
  price_without_vat?: number;
  vat: number;
  eet_yn?: boolean;
  type?: string;
}

export interface OrderDocument {
  generate_yn: '0' | '1';
  expiration_date?: string;
  date_of_issuance?: string;
  date_of_vat_revenue_recognition?: string;
}

export interface Order {
  order_number?: string;
  order_id?: number;
  case_number?: string | null;
  external_order_number?: string;
  uuid?: string;
  language_id?: string;
  currency_id?: string;
  default_currency_rate?: number;
  prices_with_vat_yn?: boolean;
  status_id?: number;
  status?: string;
  paid_date?: string;
  tracking_code?: string;
  tracking_url?: string;
  statistics_yn?: boolean;
  resolved_yn?: boolean;
  oss_yn?: boolean;
  internal_note?: string;
  last_update_time?: string;
  creation_time?: string;
  variable_symbol?: string;
  dimensions?: OrderDimensions;
  total_weight?: number;
  order_total: number;
  order_total_before_round?: number;
  order_total_rest?: number;
  invoice_number?: string;
  origin?: string;
  admin_url?: string;
  customer: OrderCustomer;
  products: OrderProduct[];
  discount_voucher?: any;
  quantity_discount?: OrderQuantityDiscount;
  loyalty_points?: any;
  shipment?: OrderShipment;
  payment?: OrderPayment;
  attachments?: any[];
  metas?: Array<{
    key: string;
    type: string;
    value: string;
  }>;
}

export interface OrderListResponse {
  current_page: number;
  current_page_items: number;
  number_of_pages: number;
  number_of_items: number;
  orders: Order[];
}

export interface OrderHistoryRecord {
  name: string;
  value: string;
}

export interface OrderHistoryResponse {
  data: OrderHistoryRecord[];
}

export interface OrderFile {
  file: File;
  file_name: string;
  code: string;
}

export interface OrderUpdateResponse {
  order_number: string;
  order_url: string;
  updated_yn: boolean;
  messages?: any[];
}

export interface OrderUpdateApiResponse {
  orders: OrderUpdateResponse[];
} 