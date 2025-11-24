import api from './axiosConfig';
import { ProductFormData, Product } from '../types/product';

export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (err) {
    console.warn('API fetchProduct failed, falling back to mock', err);
    try {
      const res = await fetch('/mock/products.json');
      if (!res.ok) throw new Error('Mock not found');
      const products: Product[] = await res.json();
      const found = products.find((p) => p.id === id);
      if (!found) throw new Error('Product not found in mock');
      return found;
    } catch (e) {
      console.error('Failed to load mock product', e);
      throw e;
    }
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (err) {
    console.warn('API fetchProducts failed, falling back to mock', err);
    try {
      const res = await fetch('/mock/products.json');
      if (!res.ok) throw new Error('Mock not found');
      const products: Product[] = await res.json();
      return products;
    } catch (e) {
      console.error('Failed to load mock products', e);
      return [];
    }
  }
};

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const { data: created } = await api.post('/products', data);
  return created;
};

export const updateProduct = async (
  id: string,
  data: ProductFormData
): Promise<Product> => {
  const { data: updated } = await api.put(`/products/${id}`, data);
  return updated;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
