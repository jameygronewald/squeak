export interface SearchData {
  address1: string;
  city: string;
  name: string;
  phone: string;
  rating: number;
  state: string;
  user_id: string;
  yelp_id: string;
  zip_code: string;
}

export interface SavedPlaceInterface {
  place_id: number;
  id: string;
  name: string;
  phone: string;
  rating: number;
  address1: string;
  city: string;
  state: string;
  zip_code: string;
  notes?: string;
  user_rating?: string;
}
