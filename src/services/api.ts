import { Business, Category, Product, ApiResponse } from '../types';

const BASE_URL = 'http://localhost:3000/public/menu';
const BUSINESS_ID = 'cmkc7lejr00004yktqn5kj064';

export const apiService = {
  async getBusinessInfo(): Promise<Business | null> {
    try {
      const response = await fetch(`${BASE_URL}/${BUSINESS_ID}`);
      if (!response.ok) return null;
      const data: ApiResponse<Business> = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('API Error (Business):', error);
      return null;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${BASE_URL}/${BUSINESS_ID}/categories`);
      if (!response.ok) return [];
      const data: ApiResponse<Category[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('API Error (Categories):', error);
      return [];
    }
  },

  async getProducts(search?: string): Promise<Product[]> {
    try {
      const url = new URL(`${BASE_URL}/${BUSINESS_ID}/products`);
      if (search) {
        url.searchParams.append('search', search);
      }
      const response = await fetch(url.toString());
      if (!response.ok) return [];
      const data: ApiResponse<Product[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('API Error (Products):', error);
      return [];
    }
  }
};
