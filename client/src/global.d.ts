export interface SavedPlaceObject {
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
