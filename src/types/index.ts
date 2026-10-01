export type PageId = 'home' | 'rooms' | 'facilities' | 'gallery' | 'contact';

export interface Room {
  id: string;
  name: string;
  image: string;
  samplePricePHP: number;
  capacityGuests: number;
  bedConfiguration: string;
  roomSize: string;
  view: string;
  shortDescription: string;
  fullDescription: string;
  amenities: string[];
  popular?: boolean;
}

export interface Facility {
  id: string;
  title: string;
  image: string;
  caption: string;
  shortDescription: string;
  fullDescription: string;
  hours: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'rooms' | 'beach-pool' | 'dining-garden' | 'moments';
  categoryLabel: string;
  image: string;
  caption: string;
  location: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  specialRequests: string;
}

export interface ReservationSummary extends ReservationFormData {
  inquiryId: string;
  submittedAt: string;
  nightsCount: number;
  estimatedTotalPHP: number;
  roomDetails?: Room;
}
