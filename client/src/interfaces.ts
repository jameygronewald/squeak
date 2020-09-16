export interface SignupInfoState {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SearchParams {
  search: string;
  city: string;
}

export interface SearchConfig {
  method: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

export interface SearchResults {
  alias: string;
  categories: object[];
  coordinates: { latitude: number; longitude: number };
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: {
    address1: string;
    address2?: string;
    address3?: null;
    city: string;
    zip_code: string;
    country: string;
    display_address: string[];
    state: string;
  };
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: [];
  url: string;
}

export interface SearchData {
  address1: string;
  city: string;
  id: string;
  name: string;
  phone: string;
  rating: number;
  state: string;
  zip_code: string;
}