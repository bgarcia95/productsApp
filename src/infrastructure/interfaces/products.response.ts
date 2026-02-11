// This works to map the API response

export interface TesloProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: TesloUser;
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Unisex = 'unisex',
  Women = 'women',
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  XL = 'XL',
  XS = 'XS',
  XXL = 'XXL',
}

export interface TesloUser {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
