export interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  category: Category;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
