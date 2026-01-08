import type { Product } from "./product.types";

interface ICartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: ICartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export type { ICartItem, CartContextType };