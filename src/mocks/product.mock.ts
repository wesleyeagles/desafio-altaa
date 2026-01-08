import type { Product } from "../types/product.types";

const mockProductSingle: Product = {
    id: 1,
    title: 'Produto Teste',
    price: 99.99,
    description: 'Descrição teste',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: { rate: 3, count: 100 },
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Zebra Product',
    price: 100,
    description: 'Test',
    category: 'electronics',
    image: 'img.jpg',
    rating: { rate: 4, count: 10 },
  },
  {
    id: 2,
    title: 'Alpha Product',
    price: 50,
    description: 'Test',
    category: 'jewelery',
    image: 'img.jpg',
    rating: { rate: 5, count: 20 },
  },
  {
    id: 3,
    title: 'Beta Product',
    price: 150,
    description: 'Test',
    category: 'electronics',
    image: 'img.jpg',
    rating: { rate: 3, count: 5 },
  },
];

export { mockProducts, mockProductSingle }