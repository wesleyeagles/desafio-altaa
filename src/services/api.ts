const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Falha ao buscar produtos');
    return response.json();
  },

  async getProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Falha ao buscar produto');
    return response.json();
  },

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Falha ao buscar categorias');
    return response.json();
  },
};