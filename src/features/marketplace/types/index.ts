export interface VA {
  id: string;
  userId: string;
  displayName: string;
  title: string;
  bio: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  avatarUrl?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  categories: string[];
  skills: string[];
  experience: string;
  availability: 'available' | 'busy' | 'unavailable';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  orderIndex: number;
}

export interface Review {
  id: string;
  vaId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}